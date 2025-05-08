const InputField = ({
    label,
    name,
    value,
    onChange,
    required = false,
    type = "text",
    placeholder = "",
    options = [],
    max,
  }) => {
    return (
      <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
        <label
          htmlFor={name}
          style={{
            fontWeight: "600",
            marginBottom: "6px",
            color: "#333",
            fontSize: "18px",
          }}
        >
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
  
        {type === "select" ? (
          <select
            style={{ width: "326px", height: "42px" }}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            required={required}
            max={max}
            pattern={name === "phoneNumber" ? "\\d{10}" : undefined}
            title={name === "phoneNumber" ? "Phone number must be exactly 10 digits" : undefined}
            maxLength={name === "phoneNumber" ? 10 : undefined}
          />
        )}
      </div>
    );
  };
  
  export default InputField;
  