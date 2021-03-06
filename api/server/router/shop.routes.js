import express from "express";
import shopController from "../controllers/shop.controller";

const router = express.Router();

router.post('/register', shopController.registerShop);

router.post('/add_product_custom_options', shopController.createProductCustomOptions);

router.post('/generate_custom_product', shopController.generateCustomProduct);

router.post('/calculate_price_seat_cushions', shopController.calculatePriceSeatCushions);

export default router