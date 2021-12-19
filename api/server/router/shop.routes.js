import express from "express";
import shopController from "../controllers/shop.controller";

const router = express.Router();

router.post('/options', shopController.createProductOptions)

router.post('/register', shopController.registerShop)

export default router