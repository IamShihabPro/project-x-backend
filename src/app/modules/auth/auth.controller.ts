import httpStatus from "http-status";
import { AuthServices } from "./auth.service";
import config from "../../config";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const signIn = catchAsync(async(req, res)=>{
    const {result, token, refreshToken} = await AuthServices.signInUser(req.body)

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: result,
        token: token
    })
})

export const AuthController = {
    signIn
}