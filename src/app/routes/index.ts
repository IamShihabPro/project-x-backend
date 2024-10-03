import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { SignInRoutes } from '../modules/auth/auth.route'
import { PostRoutes } from '../modules/post/post.route'

const router = express.Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: SignInRoutes
    },
    {
        path: '/tweets',
        route: PostRoutes
    },
]


moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router