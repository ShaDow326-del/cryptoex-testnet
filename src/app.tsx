import React, { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SpotTrade from "./components/SpotTrade";
import FuturesTrade from "./components/FuturesTrade";
import Wallet from "./components/Wallet";
import Orders from "./components/Orders";
import Incentives from "./components/Incentives";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [balance, setBalance] = useState(10000);
  const [trades, setTrades] = useState(0);
  const [rewards, setRewards] = useState(0);

  const updateBalance = (delta: number, rewardXP = 0) => {
    setBalance(prev => prev + delta);
    setRewards(prev => prev + rewardXP);
    setTrades(prev => prev + 1);
  };

  return (
    <div className="bg-[#0b0e11] min-h-screen text-[#eaecef]">
      <Header
        balance={balance}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="p-4 max-w-6xl mx-auto">
        {activeSection === "dashboard" && <Dashboard trades={trades} rewards={rewards} />}
        {activeSection === "spot" && <SpotTrade balance={balance} updateBalance={updateBalance} />}
        {activeSection === "futures" && <FuturesTrade balance={balance} updateBalance={updateBalance} />}
        {activeSection === "wallet" && <Wallet balance={balance} />}
        {activeSection === "orders" && <Orders />}
        {activeSection === "incentives" && <Incentives updateBalance={updateBalance} />}
      </div>
    </div>
  );
};

export default App;
