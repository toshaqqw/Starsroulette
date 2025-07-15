import React from "react";

interface Bet {
  name: string;
  avatar: string;
  amount: number;
}

interface WheelProps {
  bets: Bet[];
}

const Wheel: React.FC<WheelProps> = ({ bets }) => {
  return (
    <div style={styles.wheel}>
      <p>🎡 Колесо ставок (визуал заглушка)</p>
      <p>{bets.length} игроков</p>
    </div>
  );
};

const styles = {
  wheel: {
    background: "#1e293b",
    padding: "2rem",
    borderRadius: "1rem",
    color: "#fff",
  },
};

export default Wheel;
