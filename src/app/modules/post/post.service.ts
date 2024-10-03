import { JwtPayload } from "jsonwebtoken";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createPost = async (payload: TPost, userData: JwtPayload) => {
  const userInfo = await User.findOne({ email: userData.email });
  if (!userInfo) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!!");
  }

  payload.userEmail = userInfo.email as string;

  const result = await Post.create(payload);
  return result;
};

export const PostServices = {
  createPost,
};
