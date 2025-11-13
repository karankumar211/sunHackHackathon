import express from 'express';
import { addExpense, getExpenses } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.route('/').post(addExpense).get(getExpenses);

export default router;