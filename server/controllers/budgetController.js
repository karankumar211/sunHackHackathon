export const createBudgetPlan = async (req, res) => {
  const { salary } = req.body;
  if (!salary || salary <= 0) {
    return res.status(400).json({ message: 'A valid salary is required.' });
  }
  const expensePercentage = 60;
  const investmentPercentage = 40;
  const billsSplit = 35;
  const foodSplit = 25;
  const travelSplit = 10;
  const subscriptionsSplit = 15;
  const emergencyFundSplit = 15;
  let realEstateSplit, fdSplit, mediumRiskSplit, highRiskSplit;
  if (salary <= 30000) {
    realEstateSplit = 20;
    fdSplit = 50;
    mediumRiskSplit = 30;
    highRiskSplit = 0;
  } else {
    realEstateSplit = 20;
    fdSplit = 30;
    mediumRiskSplit = 30;
    highRiskSplit = 20;
  }
  const expenseAmount = salary * (expensePercentage / 100);
  const investmentAmount = salary * (investmentPercentage / 100);
  const billsAmount = expenseAmount * (billsSplit / 100);
  const foodAmount = expenseAmount * (foodSplit / 100);
  const travelAmount = expenseAmount * (travelSplit / 100);
  const subscriptionsAmount = expenseAmount * (subscriptionsSplit / 100);
  const emergencyFundAmount = expenseAmount * (emergencyFundSplit / 100);
  const realEstateAmount = investmentAmount * (realEstateSplit / 100);
  const fdAmount = investmentAmount * (fdSplit / 100);
  const mediumRiskAmount = investmentAmount * (mediumRiskSplit / 100);
  const highRiskAmount = investmentAmount * (highRiskSplit / 100);
  const plan = {
    monthlySalary: parseFloat(salary),
    expensePlan: {
      total: { percentage: expensePercentage, amount: expenseAmount.toFixed(2) },
      breakdown: [
        { category: 'Bills & Utilities', splitPercentage: billsSplit, amount: billsAmount.toFixed(2) },
        { category: 'Food & Groceries', splitPercentage: foodSplit, amount: foodAmount.toFixed(2) },
        { category: 'Travelling', splitPercentage: travelSplit, amount: travelAmount.toFixed(2) },
        { category: 'Subscriptions', splitPercentage: subscriptionsSplit, amount: subscriptionsAmount.toFixed(2) },
        { category: 'Emergency Fund', splitPercentage: emergencyFundSplit, amount: emergencyFundAmount.toFixed(2) },
      ]
    },
    investmentPlan: {
      total: { percentage: investmentPercentage, amount: investmentAmount.toFixed(2) },
      breakdown: [
        { category: 'Real Estate', splitPercentage: realEstateSplit, amount: realEstateAmount.toFixed(2), description: 'Long-term investment towards property goals.' },
        { category: 'Fixed Deposits (FD)', splitPercentage: fdSplit, amount: fdAmount.toFixed(2), description: 'Stable, low-risk savings with guaranteed returns.' },
        { category: 'Medium-Risk Equity', splitPercentage: mediumRiskSplit, amount: mediumRiskAmount.toFixed(2), description: 'Balanced investments like Large-Cap funds for moderate growth.' },
        { category: 'High-Risk Equity', splitPercentage: highRiskSplit, amount: highRiskAmount.toFixed(2), description: 'Aggressive investments like Small-Cap funds for higher potential growth.' }
      ].filter(item => item.splitPercentage > 0)
    }
  };
  res.status(200).json(plan);
};