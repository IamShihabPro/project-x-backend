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



export const PostServices = {
  createPost,
  getAllPost,
  getSinglePost
}
