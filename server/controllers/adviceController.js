import Goal from "../models/Goal.js";
import User from "../models/User.js";

const expensePercentage = 60;
const investmentPercentage = 40;
const foodSplit = 25;
const travelSplit = 10;

export const getFinancialAdvice = async (req, res) => {
  try {
    const { newGoal, salary } = req.body;
    if (!newGoal || !salary) {
      return res.json({ advice: "Every saving starts with a goal. Well done!", tags: [] });
    }
    let adviceMessage = "";
    const emotionalTags = [];
    const targetDate = new Date(newGoal.targetDate);
    const yearsAway = targetDate.getFullYear() - new Date().getFullYear();
    if (yearsAway > 5) {
      emotionalTags.push({ tag: "Long-Term Goal", type: "success" });
    } else if (yearsAway < 2) {
      emotionalTags.push({ tag: "Short-Term Goal", type: "info" });
    }
    if (newGoal.riskProfile === "High") {
      emotionalTags.push({ tag: "High-Risk", type: "warning" });
    }
    const currentMonthlyInvestment = salary * (investmentPercentage / 100);
    const monthsToGoal = (targetDate.getFullYear() - new Date().getFullYear()) * 12 + (targetDate.getMonth() - new Date().getMonth());
    const requiredMonthlyForGoal = monthsToGoal > 0 ? newGoal.targetAmount / monthsToGoal : newGoal.targetAmount;
    if (requiredMonthlyForGoal <= currentMonthlyInvestment) {
      adviceMessage = `Great news! Based on your budget, your current monthly investment allocation of ₹${currentMonthlyInvestment.toFixed(0)} is enough to reach your goal of "${newGoal.goalName}".`;
    } else {
      const shortfall = requiredMonthlyForGoal - currentMonthlyInvestment;
      const foodBudget = salary * (expensePercentage / 100) * (foodSplit / 100);
      const travelBudget = salary * (expensePercentage / 100) * (travelSplit / 100);
      const foodCut = foodBudget * 0.1;
      const travelCut = travelBudget * 0.1;
      const totalCut = foodCut + travelCut;
      adviceMessage = `To afford your goal of "${newGoal.goalName}", you need to save an extra ₹${shortfall.toFixed(0)} per month.`;
      if (totalCut >= shortfall) {
        adviceMessage += ` Here's a suggestion: Reduce your spending on Food by 10% (save ₹${foodCut.toFixed(0)}) and Travel by 10% (save ₹${travelCut.toFixed(0)}). This will help you reach your goal!`;
      } else {
        adviceMessage += ` This is a challenging goal! You may need to significantly reduce your monthly expenses or extend your goal's timeline.`;
      }
    }
    return res.json({ advice: adviceMessage, tags: emotionalTags });
  } catch (error) {
    res.status(500).json({ message: "Server error while generating advice." });
  }
};