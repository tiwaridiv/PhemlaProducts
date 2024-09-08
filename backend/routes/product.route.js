import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { createProducts, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

// POST route to create a new product
router.post("/", createProducts);

// DELETE route to remove a product by ID
router.delete("/:id",deleteProduct );

// GET route to fetch all products
router.get("/",getProducts);

// PUT route to update a product by ID
router.put("/:id",updateProduct );

export default router;
