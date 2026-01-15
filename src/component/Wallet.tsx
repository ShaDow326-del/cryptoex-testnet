import React from "react";

interface Props { balance: number; }

const Wallet: React.FC<Props> = ({ balance }) => {
  return (
    <div className="bg-[#1e2329] rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Wallet</h2>
      <p>USDT: ${balance.toFixed(2)}</p>
      <p>BTC: 0.00</p>
      <p>ETH: 0.00</p>
    </div>
  );
};

export default Wallet;
