import { JwtPayload } from "jsonwebtoken";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";

const createPost = async (payload: TPost, userData: JwtPayload) => {
  const userInfo = await User.findOne({ email: userData.email });
  if (!userInfo) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!!");
  }

  payload.userEmail = userInfo.email as string;

  const result = await Post.create(payload);
  return result;
};

const getAllPost = async (query: Record<string, unknown>) => {
    const PostSearchableFields = ['userEmail'];
    const PostsQuery = new QueryBuilder(
      Post.find(),
      query,
    )
      .search(PostSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await PostsQuery.modelQuery;
    return result;
};

const getSinglePost = async(id: string) =>{
    const result = await Post.findById(id)
    return result
}

const deletePost = async(id: string, userData: JwtPayload) =>{
  const postData = await Post.findById(id)

  if(postData?.userEmail === userData.email){
    // const result = await Post.findByIdAndDelete(postData?._id)
    const result = await Post.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
    return result
  }else{
    throw new AppError(httpStatus.EXPECTATION_FAILED, "This is not your post")
  }
}


const updatePost = async(id: string, payload: Partial<TPost>, userData: JwtPayload)=>{

  const postData = await Post.findById(id)

  if(postData?.userEmail === userData.email){
    const result = await Post.findByIdAndUpdate(id, payload, {new: true})
    return result
  }else{
    throw new AppError(httpStatus.EXPECTATION_FAILED, "This is not your post")
  }
}


export const PostServices = {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
  updatePost
}
