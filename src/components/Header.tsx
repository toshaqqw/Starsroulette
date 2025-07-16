import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  username?: string;
  avatar?: string;
  balance?: number;
  onLoginClick?: () => void;
  onAvatarClick?: () => void;
  onDepositClick?: () => void; 
}

const Header: React.FC<HeaderProps> = ({
  username,
  avatar,
  balance = 0,
  onLoginClick,
  onAvatarClick,
  onDepositClick,
}) => {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.logo} onClick={() => navigate("/")}>StarsRoulette</div>
      {username ? (
        <div style={styles.user}>
          <img
            src={avatar || "https://i.pravatar.cc/40"}
            alt="avatar"
            style={styles.avatar}
            onClick={onAvatarClick}
          />
          <span onClick={onAvatarClick} style={{ cursor: "pointer" }}>
            {username}
          </span>
          <span style={styles.balance}>Баланс: {balance.toFixed(2)} ₽</span>
          <button style={styles.depositBtn} onClick={onDepositClick}>
            Пополнить
          </button>
        </div>
      ) : (
        <button style={styles.loginBtn} onClick={onLoginClick}>
          Войти через Telegram
        </button>
      )}
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#1e293b",
    color: "#fff",
    alignItems: "center",
  },
  logo: {
    fontWeight: 700,
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  user: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
  balance: {
    marginLeft: "1rem",
    fontWeight: 600,
  },
  depositBtn: {
    marginLeft: "1rem",
    backgroundColor: "#10b981",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  loginBtn: {
    background: "#f39c12",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#1e293b",
    fontWeight: "bold",
  },
};

export default Header;
