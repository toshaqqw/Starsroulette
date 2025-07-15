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
      // ease out cubic
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setOffset(easeOut * distance);
      if (progress < 1) animFrame = requestAnimationFrame(step);
      else {
        // Определим победителя (рандом с учетом ставок)
        const total = bets.reduce((acc, b) => acc + b.amount, 0);
        let rand = Math.random() * total;
        let winner = bets[0].player;
        for (const bet of bets) {
          if (rand < bet.amount) {
            winner = bet.player;
            break;
          }
          rand -= bet.amount;
        }
        onFinish(winner);
      }
    };
    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [bets, onFinish]);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: "100%",
        background: "#111",
        borderRadius: 10,
        border: "2px solid #444",
        height: 70,
        margin: "0 auto",
        marginTop: 20,
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
              width: `${amount * 3}px`, // ширина пропорциональна ставке
              background: "#222",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 10px",
              color: "#fff",
              userSelect: "none",
            }}
          >
            <img
              src={avatarUrl}
              alt={player}
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
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
