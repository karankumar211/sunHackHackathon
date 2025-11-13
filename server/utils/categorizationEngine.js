const categoryKeywords = {
  Food: ['dinner', 'lunch', 'zomato', 'swiggy', 'restaurant', 'food', 'snacks', 'groceries'],
  Travel: ['uber', 'ola', 'flight', 'train', 'bus', 'taxi', 'ride'],
  Bills: ['electricity', 'recharge', 'phone', 'internet', 'rent', 'bill', 'utilities'],
  Shopping: ['amazon', 'flipkart', 'myntra', 'clothes', 'shopping', 'gadget'],
  Entertainment: ['movie', 'concert', 'tickets', 'netflix', 'spotify'],
};

export const categorizeExpense = (note) => {
  const noteLower = note.toLowerCase();
  for (const category in categoryKeywords) {
    if (categoryKeywords[category].some(keyword => noteLower.includes(keyword))) {
      return category;
    }
  }
  return 'Uncategorized';
};