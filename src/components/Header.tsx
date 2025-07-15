import React from "react";

interface HeaderProps {
  username: string;
  balance: number;
  onAvatarClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, balance, onAvatarClick }) => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>StarsRoulette</div>
      <div style={styles.user} onClick={onAvatarClick} title="Перейти в профиль">
        <img
          src="https://i.pravatar.cc/40"
          alt="Аватар"
          style={styles.avatar}
        />
        <span>{username}</span>
        <span style={styles.balance}>Баланс: {balance.toFixed(2)} ₽</span>
      </div>
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
    fontWeight: "700",
    fontSize: "1.5rem",
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
    fontWeight: "600",
  },
};

export default Header;
