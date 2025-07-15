import React from "react";

interface Bet {
  name: string;
  avatar: string;
  amount: number;
}

interface PlayerListProps {
  bets: Bet[];
}

const PlayerList: React.FC<PlayerListProps> = ({ bets }) => {
  return (
    <div style={styles.list}>
      <h3 style={styles.header}>👥 Игроки в раунде</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {bets.map((bet, idx) => (
          <li key={idx} style={styles.item}>
            <img src={bet.avatar} alt="avatar" style={styles.avatar} />
            <span style={styles.name}>{bet.name}</span>
            <span style={styles.amount}>💰 {bet.amount} ₽</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  list: {
    background: "#1e293b",
    padding: "1rem",
    borderRadius: "1rem",
    color: "#fff",
    marginBottom: "2rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  header: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
    color: "#f1f5f9",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.5rem 0",
    borderBottom: "1px solid #334155",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "2px solid #1e40af",
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  amount: {
    color: "#22c55e",
    fontWeight: "bold",
  },
};

export default PlayerList;
