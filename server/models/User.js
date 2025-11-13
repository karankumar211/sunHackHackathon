import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  moneyPersona: { 
    type: String, 
    enum: ['Saver', 'Impulsive', 'Balanced', 'Planner'], 
    default: 'Balanced' 
  },
  income: { type: Number, default: 0 },
  inflationRate: { type: Number, default: 7.0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);