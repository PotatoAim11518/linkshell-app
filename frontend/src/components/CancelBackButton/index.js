import React from "react";
import styles from "./CancelBackButton.module.css";
import { useHistory } from "react-router-dom";

const CancelBackButton = () => {
  const history = useHistory();

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <button
      className={`${styles.button} ${styles.cancel}`}
      type="button"
      onClick={handleCancelClick}
    >
      Cancel
    </button>
  );
};

export default CancelBackButton;
