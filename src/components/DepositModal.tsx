import React, { useState } from "react";

interface DepositModalProps {
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ onClose, onDeposit }) => {
  const [amount, setAmount] = useState<string>(""); // ввод пользователя
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setError("");
  };

  const handleSubmit = () => {
    const num = Number(amount);
    if (isNaN(num)) {
      setError("Введите число");
      return;
    }
    if (num < 1) {
      setError("Минимальная сумма — 1 ₽");
      return;
    }
    if (num > 100) {
      setError("Максимальная сумма — 100 ₽");
      return;
    }
    onDeposit(num);
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>Пополнение баланса</h2>
        <input
          type="number"
          min={1}
          max={100}
          value={amount}
          onChange={handleChange}
          placeholder="Введите сумму (1-100 ₽)"
          style={modalStyles.input}
        />
        {error && <div style={modalStyles.error}>{error}</div>}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button onClick={handleSubmit} style={modalStyles.btn}>
            Пополнить
          </button>
          <button onClick={onClose} style={modalStyles.btnCancel}>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 320,
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px 10px",
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  error: {
    marginTop: 8,
    color: "red",
    fontSize: 14,
  },
  btn: {
    backgroundColor: "#10b981",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  btnCancel: {
    backgroundColor: "#ccc",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default DepositModal;
