import React from "react";

interface Bet {
  name: string;
  avatar: string;
  amount: number;
}

interface WinnerbarProps {
  winner: Bet | null;
}

const Winnerbar: React.FC<WinnerbarProps> = ({ winner }) => {
  return (
    <div style={styles.bar}>
      {winner ? (
        <p>🏆 Победитель: {winner.name} — 💰 {winner.amount} ₽</p>
      ) : (
        <p>Ожидаем розыгрыш...</p>
      )}
    </div>
  );
};

const styles = {
  bar: {
    backgroundColor: "#1e40af",
    color: "#fff",
    padding: "1rem",
    borderRadius: "0.5rem",
  },
};

export default Winnerbar;
