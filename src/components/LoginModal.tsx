import React from "react";
import TelegramLogin from "./TelegramLogin";

interface LoginModalProps {
  onClose: () => void;
  onAuth: (user: any) => void;
  botName: string;
}

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 8,
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onAuth, botName }) => {
  // Закрытие модалки при клике на оверлей (не на контент)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={modalOverlayStyle} onClick={handleOverlayClick}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={{ float: "right" }}>✖</button>
        <h2>Вход через Telegram</h2>
        <TelegramLogin botName={botName} onAuth={onAuth} />
      </div>
    </div>
  );
};

export default LoginModal;
