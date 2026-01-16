import { useEffect, useRef, useState } from "react";

const initialPrices = {
  BTC: 95500,   // Bitcoin
  ETH: 3300,    // Ethereum
  BNB: 930,     // BNB
  TON: 1.65,    // Toncoin approximate
  USDT: 1.0,
  ADA: 0.90,
  AVAX: 15.0,
  KASPA: 0.045,
  SUI: 1.43,    // Approx typical price
  CORE: 0.22,   // placeholder realistic lower price
  SOL: 140,
  XRP: 2.1,
  DOGE: 0.14,
  DOT: 2.4,
  MATIC: 0.80,
  TRX: 0.28,
  LTC: 95,
  BCH: 500,
  NEAR: 2.0,
  FIL: 1.5,
  ICP: 3.0,
  ATOM: 8.0,
  HBAR: 0.20,
  EOS: 0.70,
  FLOW: 1.5,
  GALA: 0.03,
  APE: 1.2
};

export default function App() {
  const [active, setActive] = useState("Spot");
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(10000);
  const [prices, setPrices] = useState(initialPrices);
  const prevPrices = useRef(initialPrices);

  useEffect(() => {
    // price movement simulation
    const interval = setInterval(() => {
      setPrices((p) => {
        const updated = { ...p };
        Object.keys(updated).forEach((c) => {
          const base = initialPrices[c] || 1;
          const change = (Math.random() - 0.5) * (base * 0.02); // ±2%
          updated[c] = +(updated[c] + change).toFixed(4);
        });
        prevPrices.current = p;
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function placeOrder(coin, type) {
    const price = prices[coin] || 0;
    const amount = +(Math.random() * 200 + 50).toFixed(2);
    setBalance((b) => b - amount);
    setOrders((o) => [...o, `${type} ${coin} @ $${price.toFixed(4)}`]);
  }

  function priceColor(c) {
    if (!prevPrices.current[c]) return "#eaecef";
    return prices[c] > prevPrices.current[c] ? "#0ecb81" : "#f6465d";
  }

  function arrow(c) {
    if (!prevPrices.current[c]) return "";
    return prices[c] > prevPrices.current[c] ? " ↑" : " ↓";
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>CryptoEx Testnet</h1>
      <p>Balance: ${balance.toFixed(2)}</p>

      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["Spot", "Futures", "Orders"].map((n) => (
          <button key={n} onClick={() => setActive(n)}>
            {n}
          </button>
        ))}
      </nav>

      {(active === "Spot" || active === "Futures") && (
        <div>
          {Object.keys(prices).map((c) => (
            <div key={c} style={{ marginBottom: 6 }}>
              <strong>{c}</strong>{" "}
              <span style={{ color: priceColor(c) }}>
                ${prices[c].toFixed(4)}
                {arrow(c)}
              </span>
              <button
                onClick={() =>
                  placeOrder(c, active === "Spot" ? "BUY" : "LONG")
                }
              >
                {active === "Spot" ? "Buy" : "Long"}
              </button>
              <button
                onClick={() =>
                  placeOrder(c, active === "Spot" ? "SELL" : "SHORT")
                }
              >
                {active === "Spot" ? "Sell" : "Short"}
              </button>
            </div>
          ))}
        </div>
      )}

      {active === "Orders" && (
        <ul>
          {orders.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      )}
    </div>
  );
                          }
