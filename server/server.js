import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Import Routes
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import adviceRoutes from './routes/adviceRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import userRoutes from './routes/userRoutes.js';
import simplebotRoutes from './routes/simplebotRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/advice', adviceRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/user', userRoutes);
app.use('/api/simplebot', simplebotRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));