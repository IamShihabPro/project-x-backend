import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ProductsServices } from "./product.service";

const createProducts = catchAsync(async(req, res)=>{
    const result = await ProductsServices.createProductsIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is created succesfully',
        data: result,
      });
})

const getAllProducts = catchAsync(async(req, res)=>{
    const result = await ProductsServices.getAllProductsFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product are retrive succesfully',
        data: result,
      });
})

export const ProducsController ={
    createProducts,
    getAllProducts
}