import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { PostServices } from "./post.service";

const createPost = catchAsync(async (req, res) =>{
    const result = await PostServices.createPost(req.body, req.user)
    console.log(result)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Your post is created succesfully',
        data: result,
    });
})


const getAllPost = catchAsync(async(req, res)=>{
    const result =  await PostServices.getAllPost(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post are retrived succesfully',
        data: result,
      });
})


const getSinglePost = catchAsync(async(req, res) =>{
    const {id} = req.params
    const result = await PostServices.getSinglePost(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'A Car retrieved successfully',
        data: result,
    });
})

const deletePost = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await PostServices.deletePost(id, req.user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post is deleted succesfully',
        data: result,
      });
})

const updatePost = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await PostServices.updatePost(id, req.body, req.user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post is updated succesfully',
        data: result,
      });
})

export const PostController = {
    createPost,
    getAllPost,
    getSinglePost,
    deletePost,
    updatePost
}