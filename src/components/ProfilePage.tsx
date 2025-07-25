import React from "react";

interface TelegramUser {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: string;
  hash: string;
}

interface ProfilePageProps {
  user: TelegramUser;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  return (
    <div style={styles.container}>
      <img
        src={user.photo_url || "https://i.pravatar.cc/100"}
        alt="Аватар"
        style={styles.avatar}
      />
      <h2>{user.first_name} {user.last_name}</h2>
      <p>Добро пожаловать в ваш профиль!</p>
      <button onClick={onLogout} style={styles.logoutBtn}>Выйти</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    textAlign: "center",
    color: "#e0e0e0",
    backgroundColor: "#121212",
    minHeight: "calc(100vh - 120px)",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    marginBottom: "1rem",
    border: "3px solid #f39c12",
  },
  logoutBtn: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#f39c12",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#121212",
    fontWeight: "bold",
  },
};

export default ProfilePage;
