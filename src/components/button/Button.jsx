import PropTypes from "prop-types";
import "./button.css";

const SubmitButton = ({ id, onClick, isLoading, label, className = "" }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={isLoading}
      className={`btn btn-submit-primary w-100 py-3 ${className}`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

SubmitButton.defaultProps = {
  isLoading: false,
  label: "Submit",
  className: "",
  id: "",
};

export default SubmitButton;
