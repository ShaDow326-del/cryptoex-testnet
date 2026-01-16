import { useEffect, useState } from "react";

const coinList = [
  "BTC","ETH","BNB","TON","USDT","ADA","AVAX","KASPA","SUI","CORE",
  "SOL","XRP","DOGE","DOT","MATIC","ARB","OP","TRX","LTC","BCH",
  "APT","NEAR","FIL","ICP","ATOM","HBAR","EOS","FLOW","GALA","APE"
];

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(10000);
  const [prices, setPrices] = useState({});

  // init prices
  useEffect(() => {
    const base = {};
    coinList.forEach(c => {
      base[c] = +(Math.random() * 50000 + 1).toFixed(2);
    });
    setPrices(base);
  }, []);

  // volatility
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(p => {
        const copy = { ...p };
        Object.keys(copy).forEach(c => {
          const change = (Math.random() - 0.5) * 2; // volatile
          copy[c] = +(copy[c] + change).toFixed(2);
        });
        return copy;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function placeOrder(coin, type) {
    const amount = 100;
    setBalance(b => b - amount);
    setOrders(o => [
      ...o,
      `${type} ${coin} @ $${prices[coin]}`
    ]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>CryptoEx Testnet</h1>
      <p>Balance: ${balance.toFixed(2)}</p>

      <nav style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {["Dashboard","Spot","Futures","Orders"].map(n => (
          <button key={n} onClick={() => setActive(n)}>{n}</button>
        ))}
      </nav>

      {active === "Dashboard" && (
        <div>
          <h2>Market Overview</h2>
          {coinList.slice(0,10).map(c => (
            <p key={c}>{c}: ${prices[c]}</p>
          ))}
        </div>
      )}

      {active === "Spot" && (
        <div>
          <h2>Spot Trading</h2>
          {coinList.map(c => (
            <div key={c}>
              {c} — ${prices[c]}
              <button onClick={() => placeOrder(c,"BUY")}>Buy</button>
              <button onClick={() => placeOrder(c,"SELL")}>Sell</button>
            </div>
          ))}
        </div>
      )}

      {active === "Futures" && (
        <div>
          <h2>Futures Trading</h2>
          {coinList.map(c => (
            <div key={c}>
              {c} — ${prices[c]}
              <button onClick={() => placeOrder(c,"LONG")}>Long</button>
              <button onClick={() => placeOrder(c,"SHORT")}>Short</button>
            </div>
          ))}
        </div>
      )}

      {active === "Orders" && (
        <ul>
          {orders.map((o,i) => <li key={i}>{o}</li>)}
        </ul>
      )}
    </div>
  );
                  }
