import React from "react";

interface Props {
  balance: number;
  activeSection: string;
  setActiveSection: (s: string) => void;
}

const Header: React.FC<Props> = ({ balance, activeSection, setActiveSection }) => {
  const sections = ["dashboard","spot","futures","wallet","orders","incentives"];
  return (
    <div className="bg-[#1e2329] p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <span className="text-yellow-500 font-bold text-xl">CryptoEx</span>
        <span className="bg-yellow-500 text-black px-2 rounded text-xs font-bold">TESTNET</span>
      </div>
      <div className="flex gap-2">
        {sections.map(s => (
          <button
            key={s}
            className={`px-3 py-1 rounded text-sm ${activeSection===s?'bg-[#2b3139] text-yellow-500':'hover:bg-[#2b3139]'}`}
            onClick={()=>setActiveSection(s)}
          >
            {s.charAt(0).toUpperCase()+s.slice(1)}
          </button>
        ))}
      </div>
      <div className="font-bold">Balance: ${balance.toFixed(2)}</div>
    </div>
  );
};

export default Header;
