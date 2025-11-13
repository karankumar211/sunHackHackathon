import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import Card from "../components/ui/Card";
import { PiggyBank, Briefcase, AlertTriangle } from "lucide-react";

const BudgetPlanner = () => {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculatePlan = async () => {
      // This line correctly reads 'monthlyIncome' from the browser's storage
      const savedIncome = localStorage.getItem("monthlyIncome");

      if (!savedIncome || savedIncome === "0") {
        setError("Please set your monthly income in the Settings page first.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.createBudgetPlan({ salary: savedIncome });
        setPlan(data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not generate a plan.");
      } finally {
        setLoading(false);
      }
    };

    calculatePlan();
  }, []); // The empty array [] means this runs once when the page loads

  if (loading) {
    return <p>Your assistant is generating your plan...</p>;
  }

  if (error) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/settings"
            className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Go to Settings
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Automatic Financial Plan</h1>
      <p className="text-gray-600">
        Based on your monthly salary of **₹
        {plan?.monthlySalary.toLocaleString()}**, here is a recommended budget
        and investment strategy.
      </p>

      {plan && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Card */}
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <PiggyBank className="text-blue-500" />
              <h2 className="text-xl font-semibold">Monthly Expenses</h2>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              ₹{plan.expensePlan.total.amount}
            </p>
            <p className="text-md text-gray-500 mb-4">
              {plan.expensePlan.total.percentage}% of your income
            </p>

            <div className="mt-4 pt-4 border-t space-y-3">
              <h3 className="font-semibold text-gray-700">
                Expense Breakdown:
              </h3>
              {plan.expensePlan.breakdown.map((item) => (
                <div
                  key={item.category}
                  className="flex justify-between items-center">
                  <p className="text-gray-600">
                    {item.category} ({item.splitPercentage}%)
                  </p>
                  <p className="font-medium">₹{item.amount}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Investment Card */}
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Briefcase className="text-green-500" />
              <h2 className="text-xl font-semibold">Total for Investments</h2>
            </div>
            <p className="text-3xl font-bold text-green-600">
              ₹{plan.investmentPlan.total.amount}
            </p>
            <p className="text-md text-gray-500 mb-4">
              {plan.investmentPlan.total.percentage}% of your income
            </p>

            <div className="mt-4 pt-4 border-t space-y-3">
              <h3 className="font-semibold text-gray-700">
                Investment Breakdown:
              </h3>
              {plan.investmentPlan.breakdown.map((item) => (
                <div
                  key={item.category}
                  className="flex justify-between items-center">
                  <p className="text-gray-600">
                    {item.category} ({item.splitPercentage}%)
                  </p>
                  <p className="font-medium">₹{item.amount}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanner;
