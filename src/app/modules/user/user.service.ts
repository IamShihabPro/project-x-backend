import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TSignUp } from "./user.interface";
import { User } from "./user.model";
import { sendImageToCloudinary } from "../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from "../../config";

const signUpUserIntoDB = async (file: Express.Multer.File | undefined, payload: TSignUp) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // If a file is provided, upload the image to Cloudinary
    if (file) {
      const imageName = `${payload.name}-${Date.now()}`;
      const path = file.path;

      try {
        const { secure_url } = await sendImageToCloudinary(imageName, path);
        payload.image = secure_url as string; // Store the Cloudinary URL in the payload
      } catch (cloudinaryError) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Error uploading image to Cloudinary');
      }
    } else {
      // Assign a default image if no file is provided
      payload.image = 'default-image-url'; // Replace with an actual default image URL
    }

    // Create the new user within the transaction
    const newUser = await User.create([payload], { session }); // Using an array for session

    console.log('newUser', newUser)

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    await session.commitTransaction();
    return newUser[0]; // Return the newly created user
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message || 'Transaction failed');
  } finally {
    session.endSession(); // Ensure session ends in both success and failure cases
  }
};



// const signInUser = async (payload: TSignin) => {
//   const isUserExists = await User.findOne({ email: payload.email }).select('+password');
  
//   if (!isUserExists) {
//       throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
//   }

//   const isPasswordMatch = await bcrypt.compare(payload.password, isUserExists.password);
  
//   if (!isPasswordMatch) {
//       throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
//   }

//   const isDeleted = isUserExists?.isDeleted;

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   }

//   const jwtPayload = {
//       email: isUserExists.email,
//       role: isUserExists.role,
//   };

//   const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
//       expiresIn: config.jwt_access_expires_in,
//       });

//   const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string,
//           {
//             expiresIn: config.jwt_refresh_expires_in,
//           }
//   );

//   const result = await User.findById(isUserExists._id).select('-password');

//   return {result, token, refreshToken};
// }




const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const CarSearchableFields = ['name'];
  const carsQuery = new QueryBuilder(
    User.find(),
    query,
  )
    .search(CarSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carsQuery.modelQuery;
  return result;
};

const getSingleUser = async(id: string) =>{
  const result = await User.findById(id)
  return result
}

const getSingleUserByEmail = async(email: string) =>{
  const result = await User.findOne({email})
  return result
}

const updateUserIntoDB = async(id: string, payload: Partial<TSignUp>)=>{
  const result = await User.findByIdAndUpdate(id, payload, {new: true})
  return result
}

const deleteUserIntoDB = async(id: string) =>{
  const result = await User.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
  return result
}

export const UserServices = {
  signUpUserIntoDB,
  // signInUser,
  getAllUsersFromDB,
  getSingleUser,
  getSingleUserByEmail,
  updateUserIntoDB,
  deleteUserIntoDB
};