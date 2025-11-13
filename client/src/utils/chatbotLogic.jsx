import * as api from '../api';

export const getChatbotResponse = async (userInput, history) => {
    try {
        const { data } = await api.askChatbot({ message: userInput, history: history });
        return data.reply;
    } catch (error) {
        console.error("Error fetching bot reply:", error);
        return error.response?.data?.message || "Sorry, I'm having trouble connecting.";
    }
};