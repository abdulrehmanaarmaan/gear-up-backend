import { Router } from "express";
import { gearControllers } from "./gear.controllers";

const router = Router()

const { getAllGears, getGearDetails, getGearCategories } = gearControllers

router.get('/', getAllGears)

router.get('/:id', getGearDetails)

router.get('/categories', getGearCategories)

export const gearRoutes = router