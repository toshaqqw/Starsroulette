import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import LoginModal from "./components/LoginModal"; 
import ProfilePage from "./components/ProfilePage";
import DepositModal from "./components/DepositModal";

interface TelegramUser {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: string;
  hash: string;
}

const Header: React.FC<{
  user: TelegramUser | null;
  balance: number;
  onLoginClick: () => void;
  onAvatarClick: () => void;
  onDepositClick: () => void;
}> = ({ user, balance, onLoginClick, onAvatarClick, onDepositClick }) => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>StarsRoulette</div>
      {user ? (
        <div style={styles.user}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={onAvatarClick}>
            <img
              src={user.photo_url || "https://i.pravatar.cc/40"}
              alt="avatar"
              style={styles.avatar}
            />
            <span>
              {user.first_name} {user.last_name || ""}
            </span>
            <span style={styles.balance}>Баланс: {balance} ₽</span>
          </div>
          <button style={styles.depositBtn} onClick={onDepositClick}>Пополнить</button>
        </div>
      ) : (
        <button style={styles.loginBtn} onClick={onLoginClick}>
          Войти через Telegram
        </button>
      )}
    </header>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("telegramUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setShowLogin(false);
    } else {
      setBalance(0); // Если вышли из аккаунта, сбрасываем баланс
    }
  }, [user]);

  const handleAuth = (tgUser: TelegramUser) => {
    setUser(tgUser);
    localStorage.setItem("telegramUser", JSON.stringify(tgUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("telegramUser");
    localStorage.removeItem("balance");
    setBalance(0);
    navigate("/");
  };

  const handleDeposit = (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance.toString());
    setShowDeposit(false);
  };

  return (
    <>
      <Header
        user={user}
        balance={balance}
        onLoginClick={() => setShowLogin(true)}
        onAvatarClick={() => navigate("/profile")}
        onDepositClick={() => setShowDeposit(true)}
      />

      {showLogin && !user && (
        <LoginModal botName="StartRule_bot" onAuth={handleAuth} onClose={() => setShowLogin(false)} />
      )}

      {showDeposit && (
        <DepositModal
          onClose={() => setShowDeposit(false)}
          onDeposit={handleDeposit}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={<div style={{ padding: 20 }}>🎯 Главная страница в разработке...</div>}
        />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfilePage user={user} onLogout={handleLogout} />
            ) : (
              <div style={{ padding: 20 }}>Пожалуйста, войдите в аккаунт</div>
            )
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        🎲 Roulette
      </NavLink>
      <NavLink
        to="/profile"
        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
      >
        👤 Profile
      </NavLink>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontWeight: "700",
    fontSize: "1.5rem",
  },
  user: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
  balance: {
    color: "#10b981",
    fontWeight: "700",
    fontSize: "1rem",
    marginLeft: 12,
  },
  loginBtn: {
    backgroundColor: "#f39c12",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    color: "#1e293b",
    fontWeight: "bold",
    cursor: "pointer",
  },
  depositBtn: {
    marginLeft: 20,
    backgroundColor: "#10b981",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: "4rem",
    padding: "1rem 0",
    backgroundColor: "#1e293b",
    color: "#fff",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  link: {
    color: "#bbb",
    textDecoration: "none",
    fontSize: "1.2rem",
  },
  activeLink: {
    color: "#f39c12",
    textDecoration: "underline",
    fontWeight: "700",
  },
};

export default App;
