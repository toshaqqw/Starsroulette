import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  username?: string;
  avatar?: string;
  balance?: number;
  onLoginClick?: () => void;
  onAvatarClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  username,
  avatar,
  balance = 0,
  onLoginClick,
  onAvatarClick,
}) => {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.logo} onClick={() => navigate("/")}>StarsRoulette</div>
      {username ? (
        <div style={styles.user} onClick={onAvatarClick}>
          <img src={avatar || "https://i.pravatar.cc/40"} alt="avatar" style={styles.avatar} />
          <span>{username}</span>
          <span style={styles.balance}>Баланс: {balance.toFixed(2)} ₽</span>
        </div>
      ) : (
        <button style={styles.loginBtn} onClick={onLoginClick}>Войти через Telegram</button>
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
    cursor: "pointer",
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
