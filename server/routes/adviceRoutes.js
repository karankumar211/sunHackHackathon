import express from 'express';
import { getFinancialAdvice } from '../controllers/adviceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, getFinancialAdvice);

export default router;