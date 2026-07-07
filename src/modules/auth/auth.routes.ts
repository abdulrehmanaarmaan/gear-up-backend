import { Router } from "express";
import { authControllers } from "./auth.controllers";
import auth from "../../middlewares/auth";

const router = Router()

const { createUser, loginUser, getMyDetails } = authControllers

router.post('/register', createUser)

router.post('/login', loginUser)

router.get('/me', auth(), getMyDetails)

export const authRoutes = router