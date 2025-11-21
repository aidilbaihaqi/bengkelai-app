import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

export const meta = () => [{ title: "Log Bengkel - BengkelAI" }];

export default function WorkshopLogs() {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");
  const [newLog, setNewLog] = useState({ tanggal: "", plat: "", merk: "", model: "", pemilik: "", telepon: "", keluhan: "", diagnosis: "", status: "Masuk", estimasiBiaya: 0 });

  useEffect(() => {
    try {
      const savedLogs = JSON.parse(localStorage.getItem("workshopLogs") || "[]");
      setLogs(savedLogs);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("workshopLogs", JSON.stringify(logs));
  }, [logs]);

  const addLog = () => {
    if (!newLog.plat || !newLog.merk) return;
    const entry = { id: Date.now(), ...newLog };
    setLogs([entry, ...logs]);
    setNewLog({ tanggal: "", plat: "", merk: "", model: "", pemilik: "", telepon: "", keluhan: "", diagnosis: "", status: "Masuk", estimasiBiaya: 0 });
    setMessage("Log motor ditambahkan");
    setTimeout(() => setMessage(""), 2000);
  };

  const updateLogStatus = (id, status) => setLogs(logs.map(l => l.id === id ? { ...l, status } : l));
  const removeLog = (id) => setLogs(logs.filter(l => l.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/32x32.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-white font-bold text-xl">BengkelAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/workshop-dashboard" className="text-gray-300 hover:text-white">Dashboard Bengkel</Link>
            <Link to="/workshop-logs" className="text-cyan-400">Log</Link>
            <Link to="/workshop-stock" className="text-gray-300 hover:text-white">Stok</Link>
            <Link to="/workshop-spareparts" className="text-gray-300 hover:text-white">Sparepart</Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard User</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Log Bengkel</h1>
          <p className="text-cyan-300">Catat motor masuk dan status pengerjaan</p>
          {message && <div className="mt-3 px-4 py-2 bg-green-500/20 text-green-300 border border-green-400/30 rounded-lg">{message}</div>}
        </div>

        <div className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <input value={newLog.tanggal} onChange={(e)=>setNewLog({...newLog,tanggal:e.target.value})} type="date" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.plat} onChange={(e)=>setNewLog({...newLog,plat:e.target.value})} placeholder="Plat Nomor" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.merk} onChange={(e)=>setNewLog({...newLog,merk:e.target.value})} placeholder="Merk" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.model} onChange={(e)=>setNewLog({...newLog,model:e.target.value})} placeholder="Model" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.pemilik} onChange={(e)=>setNewLog({...newLog,pemilik:e.target.value})} placeholder="Nama Pemilik" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.telepon} onChange={(e)=>setNewLog({...newLog,telepon:e.target.value})} placeholder="No. Telepon" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.keluhan} onChange={(e)=>setNewLog({...newLog,keluhan:e.target.value})} placeholder="Keluhan" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
            <input value={newLog.diagnosis} onChange={(e)=>setNewLog({...newLog,diagnosis:e.target.value})} placeholder="Diagnosis" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
            <select value={newLog.status} onChange={(e)=>setNewLog({...newLog,status:e.target.value})} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
              <option>Masuk</option>
              <option>Proses</option>
              <option>Selesai</option>
            </select>
            <input value={newLog.estimasiBiaya} onChange={(e)=>setNewLog({...newLog,estimasiBiaya:parseInt(e.target.value||"0")})} type="number" placeholder="Estimasi Biaya (Rp)" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
          </div>
          <button onClick={addLog} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg">Tambah Log</button>
        </div>

        <div className="mt-6 space-y-2">
          {logs.length === 0 ? (
            <div className="text-gray-300">Belum ada log</div>
          ) : logs.map(l => (
            <div key={l.id} className="p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg">
              <div className="flex justify-between text-sm text-white"><span>{l.tanggal} • {l.plat} • {l.merk} {l.model}</span><span className="text-cyan-300">{l.status}</span></div>
              <div className="text-xs text-gray-300">Pemilik: {l.pemilik} • {l.telepon}</div>
              <div className="text-xs text-gray-300">Keluhan: {l.keluhan}</div>
              {l.diagnosis && <div className="text-xs text-gray-300">Diagnosis: {l.diagnosis}</div>}
              <div className="text-xs text-gray-300">Estimasi Biaya: Rp {parseInt(l.estimasiBiaya||0).toLocaleString()}</div>
              <div className="mt-2 flex gap-2">
                <button onClick={()=>updateLogStatus(l.id,'Proses')} className="px-2 py-1 bg-yellow-500 text-white rounded">Proses</button>
                <button onClick={()=>updateLogStatus(l.id,'Selesai')} className="px-2 py-1 bg-green-600 text-white rounded">Selesai</button>
                <button onClick={()=>removeLog(l.id)} className="px-2 py-1 bg-red-500 text-white rounded">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}