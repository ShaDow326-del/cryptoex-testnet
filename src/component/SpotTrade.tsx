import React, { useState } from "react";

interface Props {
  balance: number;
  updateBalance: (delta: number, rewardXP?: number) => void;
}

const coinList = [
  "BTC","ETH","BNB","TON","USDT","ADA","AVAX","KASPA","SUI","CORE",
  "SOL","DOGE","LTC","DOT","MATIC","SHIB","XRP","TRX","ATOM","BCH",
  "NEAR","ALGO","VET","FIL","ICP","AAVE","LINK","FTM","EOS","MANA"
];

const SpotTrade: React.FC<Props> = ({ balance, updateBalance }) => {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  const handleTrade = (type: string) => {
    const amt = Number(amount);
    if (!amt || amt > balance) return alert("Invalid amount");
    updateBalance(-amt, 100);
    const newOrder = { type: type.toUpperCase(), coin: selectedCoin, amount: amt };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <div>
      <div className="bg-[#1e2329] rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Spot Trading</h2>
        <select className="mb-2 p-2 rounded bg-[#2b3139]" value={selectedCoin} onChange={e => setSelectedCoin(e.target.value)}>
          {coinList.map(c => <option key={c}>{c}</option>)}
        </select>
        <input className="mb-2 p-2 rounded bg-[#2b3139] w-full" placeholder="Amount USDT" value={amount} onChange={e => setAmount(e.target.value)} />
        <div className="flex gap-2">
          <button className="flex-1 bg-green-500 p-2 rounded" onClick={()=>handleTrade("buy")}>Buy</button>
          <button className="flex-1 bg-red-500 p-2 rounded" onClick={()=>handleTrade("sell")}>Sell</button>
        </div>
      </div>

      <div className="bg-[#1e2329] rounded-xl p-4">
        <h3 className="font-bold mb-2">Orders</h3>
        <ul>
          {orders.map((o,i)=>(
            <li key={i}>{o.type} {o.coin} - ${o.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpotTrade;
