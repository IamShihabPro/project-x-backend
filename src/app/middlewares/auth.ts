import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import httpStatus from 'http-status';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';
import catchAsync from '../modules/utils/catchAsync';


const sliptToken = (authHeader: string | undefined): string | null => {
  if (!authHeader) {
      return null;
  }
  const [bearer, token] = authHeader.split(' ');

  if (bearer === 'Bearer' && token) {
      return token;
  }

  return authHeader;
};


export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // const accessToken = req.headers.authorization;

      const authHeader = req.headers.authorization;
      const token = sliptToken(authHeader);
  
      if (!token) {
        throw new AppError(401, "You are not authorized to access this route");
      }
  
      const verfiedToken = jwt.verify(
        token as string,
        config.jwt_access_secret as string
      );
  
      const { role, email } = verfiedToken as JwtPayload;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This is user is not found")
      }
  
      if (!requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")
      }

      req.user = verfiedToken as JwtPayload

      next();
    });
  };