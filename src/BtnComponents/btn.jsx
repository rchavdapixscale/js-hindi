const Button = ({ type = "submit", label, onClick, disabled = false }) => {
  const getStyle = () => {
    switch (label.toLowerCase()) {
      case "edit":
        return { backgroundColor: "orange", color: "white", margin: "0 5px" };
      case "delete":
        return { backgroundColor: "red", color: "white", margin: "0 5px" };
      case "add":
      case "submit":
        return { backgroundColor: "grey", color: "white", margin: "0 5px" };
      default:
        return { backgroundColor: "#ccc", color: "#000" };
    }
  };

  return (
    <button
      type={type}
      style={{
        padding: "8px 15px",
        border: "none",
        borderRadius: "4px",
        ...getStyle(),
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
