import React from "react";

interface TimerProps {
  active: boolean;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ active }) => {
  return (
    <div style={styles.timer}>
      ⏱ Таймер: {active ? "30 секунд" : "ожидание игроков"}
    </div>
  );
};

const styles = {
  timer: {
    background: "#334155",
    padding: "1rem",
    borderRadius: "0.5rem",
    flex: 1,
    marginRight: "1rem",
  },
};

export default Timer;
