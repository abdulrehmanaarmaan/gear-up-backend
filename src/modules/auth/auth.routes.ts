import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router()

const { createAccount, loginUser, getMyAccount } = authControllers

router.post('/register', createAccount)

router.post('/login', loginUser)

router.get('/me', getMyAccount)

export const authRoutes = router