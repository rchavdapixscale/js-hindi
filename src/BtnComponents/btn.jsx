import "./btn.css";

const Button = ({ type = "submit", label, onClick, disabled = false }) => {
  const getClassName = () => {
    switch (label.toLowerCase()) {
      case "edit":
        return "btn-edit";
      case "delete":
        return "btn-delete";
      case "add":
        return "btn-add";
      case "submit":
        return "btn-submit";
      default:
        return "btn-default";
    }
  };

  return (
    <button
      className={`btn-new ${getClassName()}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
