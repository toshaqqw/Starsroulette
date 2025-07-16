import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import LoginModal from "./components/LoginModal"; // <-- Импортируем модалку
import ProfilePage from "./components/ProfilePage";

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
  onLoginClick: () => void;
  onAvatarClick: () => void;
}> = ({ user, onLoginClick, onAvatarClick }) => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>StarsRoulette</div>
      {user ? (
        <div style={styles.user} onClick={onAvatarClick}>
          <img
            src={user.photo_url || "https://i.pravatar.cc/40"}
            alt="avatar"
            style={styles.avatar}
          />
          <span>
            {user.first_name} {user.last_name || ""}
          </span>
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
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("telegramUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuth = (tgUser: TelegramUser) => {
    setUser(tgUser);
    localStorage.setItem("telegramUser", JSON.stringify(tgUser));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("telegramUser");
    navigate("/");
  };

  return (
    <>
      <Header
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onAvatarClick={() => navigate("/profile")}
      />

      {showLogin && !user && (
        <LoginModal botName="StartRule_bot" onAuth={handleAuth} onClose={() => setShowLogin(false)} />
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
    cursor: "pointer",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
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
