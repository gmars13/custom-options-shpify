import express from "express";
import shopController from "../controllers/shop.controller";

const router = express.Router();

router.post('/options', shopController.createProductOptions);

router.post('/register', shopController.registerShop);

router.post('/add_product_custom_options', shopController.createProductCustomOptions);

router.post('/generate_custom_product', shopController.generateCustomProduct);

export default router