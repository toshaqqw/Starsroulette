import React, { useState } from "react";

interface BetFormProps {
  onPlaceBet: (amount: number) => void;
}

const BetForm: React.FC<BetFormProps> = ({ onPlaceBet }) => {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      onPlaceBet(amount);
      setAmount(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="number"
        placeholder="Введите ставку"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        style={styles.input}
      />
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
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "none",
    outline: "none",
  },
  button: {
    backgroundColor: "#0ea5e9",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
};

export default BetForm;
