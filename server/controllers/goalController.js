import Goal from '../models/Goal.js';

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({ targetDate: 'asc' });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createGoal = async (req, res) => {
  try {
    const { goalName, targetAmount, targetDate, currentAmount, riskProfile } = req.body;
    if (!goalName || !targetAmount || !targetDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const newGoal = new Goal({ userId: req.user.id, goalName, targetAmount, targetDate, currentAmount, riskProfile });
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    if (goal.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    if (goal.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Goal removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const calculateDuration = async (req, res) => {
  const { targetAmount, monthlySaving } = req.body;
  const currentAmount = req.body.currentAmount || 0;
  if (!targetAmount || !monthlySaving) {
    return res.status(400).json({ message: 'Target amount and monthly saving are required' });
  }
  if (monthlySaving <= 0) {
    return res.status(400).json({ message: 'Monthly saving must be a positive number' });
  }
  const amountNeeded = targetAmount - currentAmount;
  if (amountNeeded <= 0) {
    return res.json({ months: 0, years: 0, message: "You've already reached this goal!" });
  }
  const monthsRequired = Math.ceil(amountNeeded / monthlySaving);
  const yearsRequired = (monthsRequired / 12).toFixed(1);
  res.status(200).json({ months: monthsRequired, years: yearsRequired });
};