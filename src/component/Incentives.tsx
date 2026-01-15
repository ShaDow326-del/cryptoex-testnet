import React from "react";

interface Props {
  updateBalance: (delta: number, rewardXP?: number) => void;
}

const Incentives: React.FC<Props> = ({ updateBalance }) => {
  const claimFaucet = () => {
    updateBalance(500);
    alert("Testnet Faucet Claimed: +$500");
  };

  return (
    <div className="bg-[#1e2329] rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Incentives</h2>
      <ul className="mb-4">
        <li>✔ First Trade → 100 XP</li>
        <li>✔ First Futures Trade → 300 XP</li>
        <li>✔ 10 Trades → Faucet Bonus</li>
      </ul>
      <button className="bg-yellow-500 text-black p-2 rounded" onClick={claimFaucet}>Claim Faucet</button>
    </div>
  );
};

export default Incentives;
