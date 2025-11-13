import React, { useState, useEffect, useCallback } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { parseVoiceInput } from "../utils/voiceParser";
import * as api from "../api";
import Card from "../components/ui/Card";
import FloatingMicButton from "../components/FloatingMicButton";
import AdviceBanner from "../components/AdviceBanner";
import DonutChart from "../components/charts/DonutChart";
import { DollarSign, TrendingUp, PiggyBank } from "lucide-react";

// The component now accepts the 'language' prop from App.jsx
const Dashboard = ({ language }) => {
  const [summary, setSummary] = useState({
    totalSpend: 0,
    savingRate: 0,
    goalProgress: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState("");

  // The speech recognition hook is now initialized with the selected language
  const { isListening, transcript, startListening } = useSpeechRecognition({
    language,
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      // In a real app, a dedicated summary endpoint is best.
      // Here, we calculate from all expenses.
      const { data: expenses } = await api.getExpenses();

      const totalSpend = expenses.reduce((sum, ex) => sum + ex.amount, 0);
      const totalsByCategory = expenses.reduce((acc, ex) => {
        acc[ex.category] = (acc[ex.category] || 0) + ex.amount;
        return acc;
      }, {});

      // Placeholder values for saving rate and goal progress
      setSummary({ totalSpend, savingRate: 25, goalProgress: 15 });

      setChartData({
        labels: Object.keys(totalsByCategory),
        datasets: [
          {
            label: "Expenses",
            data: Object.values(totalsByCategory),
            backgroundColor: [
              "#4F46E5",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#6366F1",
              "#8B5CF6",
            ],
            hoverOffset: 4,
          },
        ],
      });
    } catch (err) {
      setError("Failed to fetch dashboard data.");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (transcript) {
      const parsed = parseVoiceInput(transcript);
      if (parsed && parsed.amount && parsed.note) {
        handleSaveExpense(parsed);
      } else {
        setError(
          "Could not understand that. Please say something like 'add dinner rupees 300'."
        );
      }
    }
  }, [transcript]);

  const handleSaveExpense = async (expenseData) => {
    try {
      await api.addExpense({ ...expenseData, source: "voice" });
      alert(`Expense "${expenseData.note}" for ₹${expenseData.amount} saved!`);
      // Refresh data to show instant update
      fetchDashboardData();
    } catch (err) {
      setError("Failed to save expense.");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {advice && <AdviceBanner advice={advice} />}
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <DollarSign className="text-red-500" />
            </div>
            <div>
              <p className="text-gray-500">Total Spent (Month)</p>
              <p className="text-2xl font-bold">
                ₹{summary.totalSpend.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="text-green-500" />
            </div>
            <div>
              <p className="text-gray-500">Saving Rate</p>
              <p className="text-2xl font-bold">{summary.savingRate}%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <PiggyBank className="text-blue-500" />
            </div>
            <div>
              <p className="text-gray-500">Goal Progress</p>
              <p className="text-2xl font-bold">{summary.goalProgress}%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Spending Breakdown</h2>
        <div className="h-80">
          {chartData ? (
            <DonutChart chartData={chartData} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </Card>

      <FloatingMicButton isListening={isListening} onClick={startListening} />
    </div>
  );
};

export default Dashboard;
