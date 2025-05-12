import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginOtp.css";

const LoginOtp = () => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [timer, setTimer] = useState(60);
  const [otpStatus, setOtpStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = () => {
    if (!mobile.match(/^\d{10}$/)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    setTimer(60);
    setOtpInput("");
    console.log("OTP sent:", generatedOtp);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otpInput === otp) {
      localStorage.setItem("auth", "true");
      navigate("/customer");
    } else {
      setOtpStatus("error");
    }
  };

  return (
    <form
      style={{ position: "absolute", top: "10%" }}
      className="form_container"
      onSubmit={handleVerify}
    >
      <div className="title_container">
        <p className="title">Login with OTP</p>
      </div>

      <div className="input_container">
        <label className="input_label" htmlFor="mobile_field">
          Mobile Number
        </label>
        <input
          placeholder="Enter 10-digit mobile"
          type="text"
          className="input_field"
          id="mobile_field"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={otpSent}
          required
        />
      </div>
      {otpSent && (
        <button
          type="button"
          className="edit_inline_btn"
          onClick={() => {
            setOtpSent(false);
            setOtp("");
            setOtpInput("");
            setTimer(60);
            setOtpStatus("");
          }}
        >
          Edit
        </button>
      )}

      {otpSent && (
        <>
          <div className="enter-otp">
            <h3>Enter OTP</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              {[...Array(6)].map((_, i) => (
                <input className="box-and" key={i} type="text" maxLength="1" />
              ))}
            </div>
          </div>
          <p className="otpvalid">
            OTP valid for:{" "}
            <strong>00:{timer < 10 ? `0${timer}` : timer}</strong>
          </p>
        </>
      )}

      {!otpSent ? (
        <button type="button" className="sign-in_btns" onClick={handleSendOtp}>
          <span>Send OTP</span>
        </button>
      ) : (
        <button type="submit" className="sign-in_btns">
          <span>Verify & Login</span>
        </button>
      )}

      {otpStatus === "error" && (
        <p className="invalidotp">Invalid OTP. Try again. </p>
      )}

      <div className="sign-account">
        <span>
          Don’t have an account? <a href="#"> Sign Up </a>
        </span>
        <br />
        <span>Forgot password?</span>
      </div>
    </form>
  );
};

export default LoginOtp;
