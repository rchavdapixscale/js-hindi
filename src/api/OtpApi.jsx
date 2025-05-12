import axios from 'axios';

const BASE_URL = 'https://your-domain.com'; 

export const loginViaPhone = async (phoneNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login-via-phone`, {
      phoneNumber: phoneNumber,
    });

    return response.data; 
  } catch (error) {
    console.error('Login via phone failed:', error.response?.data || error.message);
    throw error; // Let the caller handle the error
  }
};
