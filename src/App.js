import { useEffect, useRef, useState } from "react";

const coinList = [
  "BTC","ETH","BNB","TON","USDT","ADA","AVAX","KASPA","SUI","CORE",
  "SOL","XRP","DOGE","DOT","MATIC","ARB","OP","TRX","LTC","BCH",
  "APT","NEAR","FIL","ICP","ATOM","HBAR","EOS","FLOW","GALA","APE"
];

export default function App() {
  const [active, setActive] = useState("Spot");
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(10000);
  const [prices, setPrices] = useState({});
  const prevPrices = useRef({});

  // initialize prices ONCE
  useEffect(() => {
    const initial = {};
    coinList.forEach(c => {
      initial[c] = +(Math.random() * 50000 + 100).toFixed(2);
    });
    setPrices(initial);
    prevPrices.current = initial;
  }, []);

  // simulate volatility
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(p => {
        const updated = { ...p };
        Object.keys(updated).forEach(c => {
          const volatility = c === "USDT" ? 0.01 : Math.random() * 50;
          const change = (Math.random() - 0.5) * volatility;
          updated[c] = +(updated[c] + change).toFixed(2);
        });
        prevPrices.current = p;
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function placeOrder(coin, type) {
    const amount = 100;
    setBalance(b => b - amount);
    setOrders(o => [...o, `${type} ${coin} @ $${prices[coin]}`]);
  }

  function priceColor(coin) {
    if (!prevPrices.current[coin]) return "#eaecef";
    return prices[coin] > prevPrices.current[coin] ? "#0ecb81" : "#f6465d";
  }

  function arrow(coin) {
    if (!prevPrices.current[coin]) return "";
    return prices[coin] > prevPrices.current[coin] ? " ↑" : " ↓";
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>CryptoEx Testnet</h1>
      <p>Balance: ${balance.toFixed(2)}</p>

      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["Spot","Futures","Orders"].map(n => (
          <button key={n} onClick={() => setActive(n)}>{n}</button>
        ))}
      </nav>

      {(active === "Spot" || active === "Futures") && (
        <div>
          {coinList.map(c => (
            <div key={c} style={{ marginBottom: 6 }}>
              <strong>{c}</strong>{" "}
              <span style={{ color: priceColor(c) }}>
                ${prices[c]}{arrow(c)}
              </span>
              <button onClick={() => placeOrder(c, active === "Spot" ? "BUY" : "LONG")}>
                {active === "Spot" ? "Buy" : "Long"}
              </button>
              <button onClick={() => placeOrder(c, active === "Spot" ? "SELL" : "SHORT")}>
                {active === "Spot" ? "Sell" : "Short"}
              </button>
            </div>
          ))}
        </div>
      )}

      {active === "Orders" && (
        <ul>
          {orders.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      )}
    </div>
  );
            }
