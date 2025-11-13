import express from 'express';
import { createBudgetPlan } from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.post('/plan', createBudgetPlan);

export default router;