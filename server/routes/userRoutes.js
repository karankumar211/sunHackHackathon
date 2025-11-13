import express from 'express';
import { getUserProfile, updateUserDetails, getInflationHistory } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get('/me', getUserProfile);
router.put('/details', updateUserDetails);
router.get('/inflation-history', getInflationHistory);

export default router;