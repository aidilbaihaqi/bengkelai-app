import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import Header from "../components/Header";

export const meta = () => {
  return [
    { title: "Dashboard Bengkel - BengkelAI" },
    { name: "description", content: "Dashboard khusus bengkel untuk log servis dan manajemen stok" },
  ];
};

export default function WorkshopDashboard() {
  const [logsCount, setLogsCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [marketCount, setMarketCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const savedLogs = JSON.parse(localStorage.getItem("workshopLogs") || "[]");
      const savedInv = JSON.parse(localStorage.getItem("workshopInventory") || "[]");
      const savedMarket = JSON.parse(localStorage.getItem("bengkelMarketplaceItems") || "[]");
      setLogsCount(savedLogs.length);
      setInventoryCount(savedInv.length);
      setMarketCount(savedMarket.length);
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
      <Header title="Dashboard Bengkel" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard Bengkel</h1>
          <p className="text-cyan-300">Pusat navigasi fitur bengkel</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/workshop-logs" className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-colors">
            <div className="text-white font-semibold text-xl mb-2">Log Bengkel</div>
            <div className="text-cyan-300">Total: {logsCount}</div>
          </Link>
          <Link to="/workshop-stock" className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-colors">
            <div className="text-white font-semibold text-xl mb-2">Stok Sparepart</div>
            <div className="text-cyan-300">Total: {inventoryCount}</div>
          </Link>
          <Link to="/workshop-spareparts" className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-colors">
            <div className="text-white font-semibold text-xl mb-2">Sparepart Marketplace</div>
            <div className="text-cyan-300">Total: {marketCount}</div>
          </Link>
        </section>
      </main>
    </div>
  );
}