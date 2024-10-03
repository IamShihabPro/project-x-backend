import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TSignUp } from "./user.interface";
import { User } from "./user.model";
import { sendImageToCloudinary } from "../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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
    session.endSession();
  }
};



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