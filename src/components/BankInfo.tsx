import React from "react";

interface Bet {
  name: string;
  avatar: string;
  amount: number;
}

interface BankInfoProps {
  bets: Bet[];
}

const BankInfo: React.FC<BankInfoProps> = ({ bets }) => {
  const total = bets.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div style={styles.bank}>
      💼 Банк раунда: {total} ₽
    </div>
  );
};

const styles = {
  bank: {
    background: "#334155",
    padding: "1rem",
    borderRadius: "0.5rem",
    flex: 1,
  },
};

export default BankInfo;
