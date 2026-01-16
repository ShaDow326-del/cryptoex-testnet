import { useEffect, useRef, useState } from "react";
import CoinChart from "./components/CoinChart";

const initialPrices = {
  BTC: 95500,
  ETH: 3300,
  BNB: 930,
  TON: 1.65,
  USDT: 1.0,
  ADA: 0.9,
  AVAX: 15.0,
  KASPA: 0.045,
  SUI: 1.43,
  CORE: 0.22
  // add more coins as needed
};

export default function App() {
  const [active, setActive] = useState("Spot");
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(10000);
  const [prices, setPrices] = useState(initialPrices);
  const prevPrices = useRef(initialPrices);

  // price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((p) => {
        const updated = { ...p };
        Object.keys(updated).forEach((c) => {
          const base = initialPrices[c] || 1;
          const change = (Math.random() - 0.5) * (base * 0.02);
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
        {["Spot", "Futures", "Orders", "Charts"].map((n) => (
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

      {active === "Charts" && (
        <div>
          {Object.keys(prices).map((c) => (
            <div key={c} style={{ marginBottom: 30 }}>
              <h3>{c}</h3>
              <CoinChart coin={c} price={prices[c]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
            }
