import React, { useEffect, useRef, useState } from "react";

interface Bet {
  player: string;
  amount: number;
  avatarUrl: string;
}

interface LineSliderProps {
  bets: Bet[];
  onFinish: (winner: string) => void;
}

const LineSlider: React.FC<LineSliderProps> = ({ bets, onFinish }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bets.length === 0) return;

    let animFrame: number;
    let start: number | null = null;
    const duration = 10000; // 10 сек
    const distance = 1000; // px прокрутки

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setOffset(easeOut * distance);

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        const winner = chooseWinner(bets);
        onFinish(winner);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [bets, onFinish]);

  const chooseWinner = (bets: Bet[]): string => {
    const total = bets.reduce((acc, b) => acc + b.amount, 0);
    let rand = Math.random() * total;
    for (const bet of bets) {
      if (rand < bet.amount) return bet.player;
      rand -= bet.amount;
    }
    return bets[0].player;
  };

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: "100%",
        background: "#1e293b",
        borderRadius: 10,
        border: "2px solid #334155",
        height: 80,
        margin: "20px auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          display: "flex",
          transform: `translateX(-${offset}px)`,
          transition: "transform 0.1s",
          gap: 10,
          padding: "10px 0",
        }}
      >
        {bets.map(({ player, avatarUrl, amount }, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: `${amount * 3}px`,
              background: "#334155",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 10px",
              color: "#fff",
              userSelect: "none",
              boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={avatarUrl}
              alt={player}
              width={40}
              height={40}
              style={{
                borderRadius: "50%",
                border: "2px solid #1e40af",
              }}
            />
            <div>
              <b>{player}</b>
              <br />
              <small>{amount} ₽</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineSlider;
