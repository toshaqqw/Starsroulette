import React, { useState, useEffect } from "react";
import Wheel from "./Wheel";

interface Bet {
  name: string;
  avatar: string;
  amount: number;
}

const ParentComponent: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    const storedBets = localStorage.getItem("bets");
    if (storedBets) {
      setBets(JSON.parse(storedBets));
    }
  }, []);

  // Сохранение в localStorage при изменении ставок
  useEffect(() => {
    localStorage.setItem("bets", JSON.stringify(bets));
  }, [bets]);

  // Пример добавления ставки
  const addBet = (bet: Bet) => {
    setBets((prev) => [...prev, bet]);
  };

  return (
    <div>
      <Wheel bets={bets} />
      {/* Кнопка для теста */}
      <button
        onClick={() =>
          addBet({
            name: "Новый игрок",
            avatar: "https://i.pravatar.cc/40",
            amount: 100,
          })
        }
      >
        Добавить ставку
      </button>
    </div>
  );
};

export default ParentComponent;
