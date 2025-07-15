import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import FooterNav from "./components/FooterNav";

import Wheel from "./components/Wheel";
import Timer from "./components/Timer";
import BetForm from "./components/BetForm";
import PlayerList from "./components/PlayerList";
import Winnerbar from "./components/Winnerbar";
import BankInfo from "./components/BankInfo";
import ProfilePage from "./components/ProfilePage"; // Импорт страницы профиля

// Тип ставки
interface Bet {
  name: string;
  avatar: string;
  amount: number;
}

// Вынесем основную логику рулетки в отдельный компонент MainPage
const MainPage: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [winner, setWinner] = useState<Bet | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    setTimerActive(bets.length >= 2);
  }, [bets]);

  const handlePlaceBet = (amount: number) => {
    const newBet: Bet = {
      name: "User", // позже будет Telegram username
      avatar: "https://i.pravatar.cc/30",
      amount,
    };
    setBets((prev) => [...prev, newBet]);
  };

  const handleTimeout = () => {
    if (bets.length === 0) return;
    const total = bets.reduce((sum, b) => sum + b.amount, 0);
    const r = Math.random() * total;
    let acc = 0;
    for (let b of bets) {
      acc += b.amount;
      if (r <= acc) {
        setWinner(b);
        break;
      }
    }
    setTimeout(() => {
      setBets([]);
      setWinner(null);
    }, 5000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <Wheel bets={bets} />
      </div>

      <div style={styles.infoRow}>
        <Timer active={timerActive} onTimeout={handleTimeout} />
        <BankInfo />
      </div>

      <BetForm onPlaceBet={handlePlaceBet} />
      <PlayerList bets={bets} />

      <div style={styles.section}>
        <Winnerbar winner={winner} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const navigate = useNavigate();

  // Клик по аватару в Header
  const handleAvatarClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <Header username="StarsUser" balance={1234.56} onAvatarClick={handleAvatarClick} />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <FooterNav />
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#0f172a",
    color: "#fff",
    minHeight: "100vh",
    padding: "2rem",
    paddingBottom: "5rem", // чтобы не перекрывалось футером
    fontFamily: "'Inter', sans-serif",
  },
  section: {
    margin: "2rem 0",
    textAlign: "center",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
};

export default App;
