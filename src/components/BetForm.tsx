import React, { useState } from "react";

interface BetFormProps {
  onPlaceBet: (amount: number) => void;
}

const BetForm: React.FC<BetFormProps> = ({ onPlaceBet }) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError("Сумма должна быть больше 0");
      return;
    }
    setError("");
    onPlaceBet(amount);
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputWrapper}>
        <input
          type="number"
          placeholder="Введите ставку"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{
            ...styles.input,
            border: error ? "2px solid #f87171" : "none",
          }}
        />
        {error && <div style={styles.error}>{error}</div>}
      </div>
      <button type="submit" style={styles.button}>
        Сделать ставку
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem 0",
    gap: "1rem",
    flexWrap: "wrap" as const,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column" as const,
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    outline: "none",
    minWidth: "150px",
  },
  button: {
    backgroundColor: "#0ea5e9",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    marginTop: "0.25rem",
    color: "#f87171", // красный
    fontSize: "0.875rem",
    fontWeight: "500",
  },
};

export default BetForm;
