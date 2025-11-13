import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({ _id: user._id, name: user.name, email: user.email, moneyPersona: user.moneyPersona, income: user.income, inflationRate: user.inflationRate });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { income, inflationRate } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (income !== undefined) {
      user.income = parseFloat(income);
    }
    if (inflationRate !== undefined) {
      user.inflationRate = parseFloat(inflationRate);
    }
    const updatedUser = await user.save();
    res.status(200).json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, income: updatedUser.income, inflationRate: updatedUser.inflationRate });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getInflationHistory = async (req, res) => {
  const inflationData = [
    { year: 2019, rate: 3.73 },
    { year: 2020, rate: 6.62 },
    { year: 2021, rate: 5.13 },
    { year: 2022, rate: 6.70 },
    { year: 2023, rate: 5.69 },
    { year: 2024, rate: 4.85 },
  ];
  res.status(200).json(inflationData);
};