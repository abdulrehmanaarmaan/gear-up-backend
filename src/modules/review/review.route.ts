import { Router } from "express";
import { createReview } from "./review.controller";

const router = Router()

router.post('/', createReview)

export const reviewRoutes = router