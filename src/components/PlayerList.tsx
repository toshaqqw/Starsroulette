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
      <h3>👥 Игроки в раунде</h3>
      <ul>
        {bets.map((bet, idx) => (
          <li key={idx} style={styles.item}>
            <img src={bet.avatar} alt="avatar" style={styles.avatar} />
            <span>{bet.name}</span> — 💰 {bet.amount} ₽
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
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.5rem",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  },
};

export default PlayerList;
