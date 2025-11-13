import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import Navbar from './components/layout/Navbar.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Transactions from './pages/Transactions.jsx';
import Goals from './pages/Goals.jsx';
import Settings from './pages/Settings.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import BudgetPlanner from './pages/BudgetPlanner.jsx';
import Chatbot from './components/chatbot/Chatbot.jsx';
import ChatbotToggle from './components/chatbot/ChatbotToggle.jsx';

function App() {
  const { user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [language, setLanguage] = useState('en-US');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {user && <Navbar language={language} setLanguage={setLanguage} />}
      <main className={user ? "container mx-auto p-4 md:p-6" : ""}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard language={language} />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/planner" element={<BudgetPlanner />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>
      {user && (
        <>
          <ChatbotToggle onClick={() => setIsChatOpen(!isChatOpen)} />
          <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} language={language} />
        </>
      )}
    </div>
  );
}

export default App;