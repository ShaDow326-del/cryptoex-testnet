import { useState } from "react";

const coins = [
  "BTC","ETH","BNB","TON","USDT","ADA","AVAX","KASPA","SUI","CORE",
  "SOL","XRP","DOGE","DOT","MATIC","ARB","OP","TRX","LTC","BCH",
  "APT","NEAR","FIL","ICP","ATOM","HBAR","EOS","FLOW","GALA","APE"
];

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [orders, setOrders] = useState([]);
  const [balance, setBalance] = useState(10000);

  function placeOrder(coin, type) {
    const amount = 100;
    setBalance(b => b - amount);
    setOrders(o => [...o, `${type} ${coin} - $${amount}`]);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>CryptoEx Testnet</h1>
      <p>Balance: ${balance}</p>

      <nav style={{ display: "flex", gap: 10 }}>
        {["Dashboard","Spot","Futures","Orders"].map(n => (
          <button key={n} onClick={() => setActive(n)}>{n}</button>
        ))}
      </nav>

      {active === "Dashboard" && <h2>Welcome to Testnet</h2>}

      {active === "Spot" && (
        <div>
          <h2>Spot Trading</h2>
          {coins.map(c => (
            <div key={c}>
              {c}
              <button onClick={() => placeOrder(c,"BUY")}>Buy</button>
              <button onClick={() => placeOrder(c,"SELL")}>Sell</button>
            </div>
          ))}
        </div>
      )}

      {active === "Futures" && (
        <div>
          <h2>Futures Trading</h2>
          {coins.map(c => (
            <div key={c}>
              {c}
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
