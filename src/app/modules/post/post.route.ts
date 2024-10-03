import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { PostValidation } from './post.validation'
import { PostController } from './post.controller'
import { USER_ROLE } from '../user/user.constant'
import { auth } from '../../middlewares/auth'


const router = express.Router()

router.post('/tweet', auth(USER_ROLE.user, USER_ROLE.admin), validateRequest(PostValidation.createPostValidation), PostController.createPost)
router.get('/tweet', auth(USER_ROLE.user, USER_ROLE.admin), PostController.getAllPost )
router.get('/tweet/:id', auth(USER_ROLE.user, USER_ROLE.admin), PostController.getSinglePost)
router.delete('/tweet/:id', auth(USER_ROLE.user, USER_ROLE.admin), PostController.deletePost)



export const PostRoutes = router