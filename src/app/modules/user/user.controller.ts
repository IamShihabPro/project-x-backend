import httpStatus from "http-status";
import { UserServices } from "./user.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import config from "../../config";

const signUpUser = catchAsync(async (req, res) => {
  const result = await UserServices.signUpUserIntoDB(req.file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

// const signIn = catchAsync(async(req, res)=>{
//   const {result, token, refreshToken} = await UserServices.signInUser(req.body)

//   res.cookie('refreshToken', refreshToken, {
//       secure: config.NODE_ENV === 'production',
//       httpOnly: true
//   })


//   sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User logged in successfully',
//       data: result,
//       token: token
//   })
// })

const getAllUsers = catchAsync(async(req, res)=>{
  const result = await UserServices.getAllUsersFromDB(req.query)
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users are retrive succesfully',
      data: result,
    });
})


const getSingleUser = catchAsync(async(req, res)=>{
  const {id} = req.params
  const result = await UserServices.getSingleUser(id)
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users is retrive succesfully',
      data: result,
    });
})

const getSingleUserByEmail = catchAsync(async(req, res)=>{
  const {email} = req.params
  const result = await UserServices.getSingleUserByEmail(email)
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users is retrive succesfully',
      data: result,
    });
})


const updateUser = catchAsync(async(req, res)=>{
  const {id} = req.params
  const result = await UserServices.updateUserIntoDB(id, req.body)
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is updated succesfully',
      data: result,
    });
})

const deleteUser = catchAsync(async(req, res)=>{
  const {id} = req.params
  const result = await UserServices.deleteUserIntoDB(id)
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is deleted succesfully',
      data: result,
    });
})

export const UserControllers = {
  signUpUser,
  // signIn,
  getAllUsers,
  getSingleUser,
  getSingleUserByEmail,
  updateUser,
  deleteUser
}