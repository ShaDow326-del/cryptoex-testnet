import React, { useState } from "react";

interface Props {
  balance: number;
  updateBalance: (delta: number, rewardXP?: number) => void;
}

const FuturesTrade: React.FC<Props> = ({ balance, updateBalance }) => {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [margin, setMargin] = useState("");
  const [leverage, setLeverage] = useState("5x");
  const [orders, setOrders] = useState<any[]>([]);

  const coinList = [
    "BTC","ETH","BNB","TON","USDT","ADA","AVAX","KASPA","SUI","CORE",
    "SOL","DOGE","LTC","DOT","MATIC","SHIB","XRP","TRX","ATOM","BCH",
    "NEAR","ALGO","VET","FIL","ICP","AAVE","LINK","FTM","EOS","MANA"
  ];

  const handlePosition = (type: string) => {
    const m = Number(margin);
    if (!m || m > balance) return alert("Invalid margin");
    updateBalance(-m, 300);
    const newOrder = { type: type.toUpperCase(), coin: selectedCoin, margin: m, leverage };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <div>
      <div className="bg-[#1e2329] rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Futures Trading</h2>
        <select className="mb-2 p-2 rounded bg-[#2b3139]" value={selectedCoin} onChange={e => setSelectedCoin(e.target.value)}>
          {coinList.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="mb-2 p-2 rounded bg-[#2b3139]" value={leverage} onChange={e => setLeverage(e.target.value)}>
          <option>5x</option>
          <option>10x</option>
          <option>20x</option>
        </select>
        <input className="mb-2 p-2 rounded bg-[#2b3139] w-full" placeholder="Margin USDT" value={margin} onChange={e=>setMargin(e.target.value)} />
        <div className="flex gap-2">
          <button className="flex-1 bg-green-500 p-2 rounded" onClick={()=>handlePosition("long")}>Long</button>
          <button className="flex-1 bg-red-500 p-2 rounded" onClick={()=>handlePosition("short")}>Short</button>
        </div>
      </div>

      <div className="bg-[#1e2329] rounded-xl p-4">
        <h3 className="font-bold mb-2">Futures Orders</h3>
        <ul>
          {orders.map((o,i)=>(
            <li key={i}>{o.type} {o.coin} - ${o.margin} ({o.leverage})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FuturesTrade;
