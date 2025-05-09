import React, { useState } from "react";

const OtpGenerator = () => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState(["", "", "", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState("");

  const handleSendOtp = () => {
    if (!mobile.match(/^\d{10}$/)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    setOtpStatus("");
    setOtpInput(["", "", "", "", "", ""]);
    console.log("OTP sent:", generatedOtp);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtpInput = [...otpInput];
    newOtpInput[index] = value;
    setOtpInput(newOtpInput);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmitOtp = () => {
    const enteredOtp = otpInput.join("");
    if (enteredOtp === otp) {
      setOtpStatus("success");
      alert("Login successful!");
      // TODO: You can redirect or set auth token here
    } else {
      setOtpStatus("error");
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        width: "300px",
        height: "300px",
        padding: "30px",
        background:"rgb(64, 81, 137)"
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "20px", color:"white",letterSpacing:"1.2px" }}>OTP Generator</h2>

      <input
        style={{ color: "black", marginLeft: "50px" }}
        type="text"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <div style={{ marginLeft: "100px", paddingTop: "20px" }}>
        <button onClick={handleSendOtp}>Send OTP</button>
      </div>

      {otpSent && (
        <>
          <table border="1" style={{ marginTop: "10px", marginBottom: "10px" }}>
            <tbody>
              <tr>
                <td style={{color:"white"}}>OTP Sent:</td>
                <td style={{color:"white"}}>{otp}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <span style={{fontSize:"20px", width:"200px", height:"30px", color:"white"}}>Please enter the code we have sent you.</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: "5px",
              paddingTop: "30px",
            }}
          >
            {otpInput.map((digit, index) => (
              <input
                style={{ height: "30px", width: "30px", color: "black" }}
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button onClick={handleSubmitOtp}>Submit OTP</button>
          </div>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {otpStatus === "success" && (
              <p style={{ color: "green" }}>OTP Verified! You are logged in.</p>
            )}
            {otpStatus === "error" && (
              <p style={{ color: "red" }}>Wrong OTP. Please try again.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OtpGenerator;
