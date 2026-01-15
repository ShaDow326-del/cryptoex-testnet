import React, { useEffect, useState } from "react";
import CoinChart from "./CoinChart";

interface Props {
  trades: number;
  rewards: number;
}

const coinList = [
  "BTC","ETH","BNB","TON","USDT","ADA","AVAX","KASPA","SUI","CORE",
  "SOL","DOGE","LTC","DOT","MATIC","SHIB","XRP","TRX","ATOM","BCH",
  "NEAR","ALGO","VET","FIL","ICP","AAVE","LINK","FTM","EOS","MANA"
];

const Dashboard: React.FC<Props> = ({ trades, rewards }) => {
  const [coins, setCoins] = useState<any[]>([]);

  useEffect(() => {
    const data = coinList.map(c => {
      const price = Math.random() * 50000 + 1000;
      const history = Array.from({ length: 30 }, () => price * (0.95 + Math.random() * 0.1));
      return { name: c, price: price.toFixed(2), change: (Math.random() * 10 - 5).toFixed(2), history };
    });
    setCoins(data);
  }, []);

  return (
    <div>
      <div className="bg-[#1e2329] rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-2">Dashboard</h2>
        <p>Total Trades: {trades}</p>
        <p>Testnet Rewards: {rewards} XP</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {coins.map(coin => (
          <div key={coin.name} className="bg-[#1e2329] rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="font-bold">{coin.name}</span>
              <span className={Number(coin.change) >= 0 ? "text-green-500" : "text-red-500"}>{coin.change}%</span>
            </div>
            <CoinChart history={coin.history} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
