import React, { useState } from "react";

interface DepositModalProps {
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ onClose, onDeposit }) => {
  const [amount, setAmount] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setAmount("");
      return;
    }
    const num = Number(val);
    if (!isNaN(num)) {
      setAmount(num);
    }
  };

  const handleSubmit = () => {
    if (typeof amount === "number" && amount >= 1 && amount <= 100) {
      onDeposit(amount);
    } else {
      alert("Введите сумму от 1 до 100");
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>Пополнить баланс</h2>
        <input
          type="number"
          value={amount}
          onChange={handleChange}
          min={1}
          max={100}
          placeholder="Сумма от 1 до 100"
          style={modalStyles.input}
        />
        <div style={modalStyles.buttons}>
          <button onClick={handleSubmit} style={modalStyles.depositBtn}>
            Пополнить
          </button>
          <button onClick={onClose} style={modalStyles.cancelBtn}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

const modalStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  depositBtn: {
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#bdc3c7",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DepositModal;
