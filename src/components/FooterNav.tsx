import React from "react";
import { useNavigate } from "react-router-dom";
import { TbDice2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

const DiceIcon = TbDice2 as React.ComponentType<{ size?: number }>;
const UserIcon = FaUser as React.ComponentType<{ size?: number }>;

const FooterNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer style={styles.footer}>
      <div style={styles.icon} onClick={() => navigate("/")}>
        <DiceIcon size={24} />
        <span>Рулетка</span>
      </div>
      <div style={styles.icon} onClick={() => navigate("/profile")}>
        <UserIcon size={24} />
        <span>Профиль</span>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1e293b",
    display: "flex",
    justifyContent: "space-around",
    padding: "1rem 0",
    color: "#fff",
    fontSize: "0.9rem",
  },
  icon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
};

export default FooterNav;
