import React, { useEffect, useState } from "react";

interface Bet {
  name: string;
  avatar: string;
  amount: number;
}

interface WinnerbarProps {
  winner: Bet | null;
}

const Winnerbar: React.FC<WinnerbarProps> = ({ winner }) => {
  const [storedWinner, setStoredWinner] = useState<Bet | null>(null);

  useEffect(() => {
    if (winner) {
      localStorage.setItem("lastWinner", JSON.stringify(winner));
      setStoredWinner(winner);
    } else {
      // Попытка загрузить из хранилища, если нет текущего победителя
      const saved = localStorage.getItem("lastWinner");
      if (saved) {
        setStoredWinner(JSON.parse(saved));
      }
    }
  }, [winner]);

  return (
    <div style={styles.bar}>
      {storedWinner ? (
        <p>🏆 Победитель: {storedWinner.name} — 💰 {storedWinner.amount} ₽</p>
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
