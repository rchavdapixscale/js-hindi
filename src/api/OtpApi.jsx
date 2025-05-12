import axios from "axios";

const apiKey = "05646635804321276";

export const loginViaPhone = async (phoneNumber) => {
  try {
    const res = await axios.post(
      "https://green-bill-api-dev.myjilo.com/api/auth/login-via-phone",
      { phoneNumber },
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json"
        }
      }
    );
    return res;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return error.response;
  }
};

export const loginverifyotp = async (phoneNumber, otp) => {
  try {
    const res = await axios.post(
      "https://green-bill-api-dev.myjilo.com/api/auth/verify-otp",
      {
        phoneNumber,
        otp
      },
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json"
        }
      }
    );
    return res;
  } catch (error) {
    console.error("OTP Verify error:", error.response?.data || error.message);
    return error.response;
  }
};
