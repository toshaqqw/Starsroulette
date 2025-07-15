import React from "react";

const ProfilePage: React.FC = () => {
  const user = {
    name: "Алексей Иванов",
    avatarUrl: "https://i.pravatar.cc/100",
    betsCount: 120,
    totalBetCurrency: 5000,
    totalWinCurrency: 7500,
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: "2rem",
      minHeight: "calc(100vh - 120px)",
      color: "#e0e0e0",
      backgroundColor: "#121212",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
      textAlign: "center",
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #f39c12",
      boxShadow: "0 0 10px rgba(243, 156, 18, 0.5)",
    },
    name: {
      fontSize: "1.6rem",
      fontWeight: "600",
    },
    stats: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "1rem",
      fontSize: "1.1rem",
    },
    statItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#1e293b",
      padding: "1rem 1.5rem",
      borderRadius: "10px",
      minWidth: 120,
    },
    logoutButton: {
      marginTop: "2rem",
      backgroundColor: "#f39c12",
      color: "#121212",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    logoutButtonHover: {
      backgroundColor: "#e08e0b",
    },
  };

  const handleLogout = () => {
    alert("Выход из аккаунта");
    // Здесь можно добавить удаление токенов, редирект и т.д.
  };

  return (
    <div style={styles.container}>
      <img src={user.avatarUrl} alt="Аватар пользователя" style={styles.avatar} />
      <div style={styles.name}>{user.name}</div>
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <div>Ставок</div>
          <strong>{user.betsCount}</strong>
        </div>
        <div style={styles.statItem}>
          <div>Поставлено</div>
          <strong>{user.totalBetCurrency} ₽</strong>
        </div>
        <div style={styles.statItem}>
          <div>Выиграно</div>
          <strong>{user.totalWinCurrency} ₽</strong>
        </div>
      </div>
      <button
        style={styles.logoutButton}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = styles.logoutButtonHover.backgroundColor!)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = styles.logoutButton.backgroundColor!)
        }
        onClick={handleLogout}
      >
        Выйти
      </button>
    </div>
  );
};

export default ProfilePage;
