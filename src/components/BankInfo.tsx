import React from "react";

const BankInfo: React.FC = () => {
  return (
    <div style={styles.bank}>
      💼 Банк раунда: 0 ₽
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
