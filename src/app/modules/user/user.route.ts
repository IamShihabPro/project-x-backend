import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { USER_ROLE } from './user.constant';
import { auth } from '../../middlewares/auth';
import { upload } from '../utils/sendImageToCloudinary';
const router = express.Router();


router.post(
  '/signup',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidation.createUserValidation),
  UserControllers.signUpUser,
);

// router.post('/signin', validateRequest(UserValidation.signinValidation), UserControllers.signIn)


router.get('/', UserControllers.getAllUsers)
router.get('/:id', UserControllers.getSingleUser)
router.get('/user/:email', UserControllers.getSingleUserByEmail)

// router.put('/user/:id', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(UserValidation.updateUserValidation), UserControllers.updateUser)

router.delete('/:id', auth(USER_ROLE.admin), UserControllers.deleteUser)


export const UserRoutes = router;