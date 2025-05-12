import { useState, useEffect } from "react";
import { loginViaPhone, loginverifyotp } from "../api/OtpApi";
import { useNavigate } from "react-router-dom";


const OtpApiBase = () => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [otpStatus, setOtpStatus] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    try {
      const res = await loginViaPhone(phone);
      console.log("OTP sent:", res?.data);
      setOtpSent(true);
      setTimer(30);
      setOtpInput(new Array(6).fill(""));
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otpInput];
    updatedOtp[index] = value;
    setOtpInput(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otpInput.join("").trim();

    if (enteredOtp.length !== 6) {
      setOtpStatus("Please enter full 6-digit OTP");
      return;
    }

    try {
      const res = await loginverifyotp(phone, enteredOtp);

      if (res?.data?.success) {
        localStorage.setItem("token", res.data.token);
        alert("OTP Verified. Logging in...");
        navigate("/customer"); 
      } else {
        setOtpStatus(res?.data?.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setOtpStatus("Something went wrong. Try again.");
    }
  };
  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2 style={{fontSize:"20px", textAlign:"center"}}>Phone OTP Login</h2>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          color: "black",
        }}
        disabled={otpSent}
      />

      {!otpSent ? (
        <button
          onClick={handleSendOtp}
          style={{ padding: "10px", width: "100%" }}
        >
          Send OTP
        </button>
      ) : (
        <>
          <div style={{ marginTop: "20px" }}>
            <h4>Enter OTP</h4>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              {otpInput.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "18px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color:"black",
                  }}
                />
              ))}
            </div>
            <p style={{ marginTop: "10px" }}>
              OTP valid for:{" "}
              <strong>00:{timer < 10 ? `0${timer}` : timer}</strong>
            </p>
            <button
              onClick={handleVerifyOtp}
              style={{ marginTop: "10px", padding: "10px", width: "100%" }}
            >
              Verify OTP
            </button>
            {otpStatus && <p style={{ color: "red" }}>{otpStatus}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default OtpApiBase;
