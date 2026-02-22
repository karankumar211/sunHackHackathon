# SunHacks Hackathon Project

This repository contains the code for the SunHacks hackathon entry — a full-stack web application designed to help users manage their finances with the aid of modern AI-powered tools. The application includes budgeting features, expense tracking, financial goal setting, charts, and a simple chatbot.

## 🚀 Features
- **User Authentication**: Signup, login, and protected routes using JWT
- **Budget Planning**: Create and manage budgets
- **Expense Tracking**: Record expenses with automatic categorization
- **Goal Setting**: Set and track financial goals
- **Reports & Charts**: Visualize data with bar, line, and donut charts
- **AI Chatbot**: Simple chatbot to assist with budgeting advice
- **Speech Recognition**: Voice input for chatbot interactions

## 🗂️ Project Structure
```
sunHacks/
├── client/           # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── api/      # Axios or fetch helpers
│   │   ├── components/  # Reusable UI components
│   │   ├── context/  # React context providers
│   │   ├── hooks/    # Custom React hooks
│   │   ├── pages/    # Route-specific page components
│   │   └── utils/    # Utility functions
│   ├── package.json
│   └── vite.config.js
└── server/           # Backend (Node.js + Express)
    ├── controllers/  # Route logic
    ├── middleware/   # Express middleware (e.g., auth)
    ├── models/       # Mongoose schemas
    ├── routes/       # Express routes
    └── utils/        # Helper functions
```

## 🛠️ Tech Stack
- **Frontend**: React, Vite, JSX, CSS
- **Backend**: Node.js, Express, MongoDB (via Mongoose)
- **Authentication**: JWT
- **Charts**: Recharts or similar
- **Speech & Chat**: Web Speech API and custom chatbot logic

## 🔧 Getting Started
### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB running locally or a connection URI

### Setup Backend
```bash
cd sunHacks/server
npm install
# create a .env file with MONGODB_URI and JWT_SECRET
npm start
```

### Setup Frontend
```bash
cd sunHacks/client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the frontend and [http://localhost:5000](http://localhost:5000) (or configured port) for the backend.

## 📁 Environment Variables
| Name         | Description                     |
|--------------|---------------------------------|
| MONGODB_URI  | MongoDB connection string       |
| JWT_SECRET   | Secret for signing JWT tokens   |
| PORT         | Backend server port (optional)  |



## 🙌 Contributing
Feel free to open issues or submit pull requests. Maintain a clean commit history and follow conventional commits if possible.



*Created for the SunHacks Hackathon project.*
