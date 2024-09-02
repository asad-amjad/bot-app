import PropTypes from "prop-types";
import styles from "./button.module.css";

const SubmitButton = ({ id, onClick, isLoading,loadingLabel, label, className = "" }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={isLoading}
      className={`btn ${styles.btnCustomPrimary} w-100 py-3 ${className}`}
    >
      {isLoading ? loadingLabel : label}
    </button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  loadingLabel: PropTypes.string,
};

export default SubmitButton;
