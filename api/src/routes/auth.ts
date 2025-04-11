import { Router } from "express";
import * as authController from '../controllers/auth'


export const authRoutes = Router()

authRoutes.post('/signup', authController.signup)
// authRoutes.post('signin', authController.signin)
// authRoutes.post('/validate', authController.validate)