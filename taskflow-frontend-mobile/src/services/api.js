import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateAiTasks = async (userPrompt) => {
  try {
    const response = await api.post('/tasks/ai/generate', { prompt: userPrompt });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;