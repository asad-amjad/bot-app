// backend/utils/vectorShiftService.js

const axios = require('axios');

const vectorShiftAPI = axios.create({
  baseURL: process.env.VECTORSHIFT_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.VECTORSHIFT_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Upload File
exports.uploadFile = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await vectorShiftAPI.post('/upload', formData, {
      headers: formData.getHeaders(),
    });

    return response.data;
  } catch (error) {
    throw new Error(`VectorShift File Upload Error: ${error.message}`);
  }
};

// Submit Query
exports.submitQuery = async (userId, query) => {
  try {
    const response = await vectorShiftAPI.post(`/user/${userId}/query`, { query });
    return response.data;
  } catch (error) {
    throw new Error(`VectorShift Query Submission Error: ${error.message}`);
  }
};

// Retrieve Result
exports.getResult = async (resultId) => {
  try {
    const response = await vectorShiftAPI.get(`/result/${resultId}`);
    return response.data;
  } catch (error) {
    throw new Error(`VectorShift Get Result Error: ${error.message}`);
  }
};
