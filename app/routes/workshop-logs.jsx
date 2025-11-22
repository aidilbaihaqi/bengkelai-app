import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import Header from "../components/Header";

export const meta = () => [{ title: "Log Bengkel - BengkelAI" }];

export default function WorkshopLogs() {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");
  const [newLog, setNewLog] = useState({ tanggal: "", plat: "", merk: "", model: "", pemilik: "", telepon: "", keluhan: "", diagnosis: "", status: "Masuk", estimasiBiaya: 0 });
  const [editingLogId, setEditingLogId] = useState(null);
  const [editLogDraft, setEditLogDraft] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
      <Header title="Log Bengkel" />

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
            <input value={newLog.estimasiBiaya} onChange={(e)=>setNewLog({...newLog,estimasiBiaya:parseInt(e.target.value||"0")})} type="number" placeholder="tolong masukin harga" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
          </div>
          <button onClick={addLog} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg">Tambah Log</button>
        </div>

        <div className="mt-6 space-y-2">
          {logs.length === 0 ? (
            <div className="text-gray-300">Belum ada log</div>
          ) : logs.map(l => (
            <div key={l.id} className="p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg">
              {editingLogId === l.id ? (
                <div className="space-y-2 text-sm text-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input value={editLogDraft?.tanggal || ''} onChange={(e)=>setEditLogDraft({...editLogDraft,tanggal:e.target.value})} type="date" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2" />
                    <input value={editLogDraft?.plat || ''} onChange={(e)=>setEditLogDraft({...editLogDraft,plat:e.target.value})} placeholder="Plat Nomor" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2" />
                    <input value={editLogDraft?.merk || ''} onChange={(e)=>setEditLogDraft({...editLogDraft,merk:e.target.value})} placeholder="Merk" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2" />
                    <input value={editLogDraft?.model || ''} onChange={(e)=>setEditLogDraft({...editLogDraft,model:e.target.value})} placeholder="Model" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 md:col-span-2" />
                    <input value={editLogDraft?.pemilik || ''} onChange={(e)=>setEditLogDraft({...editLogDraft,pemilik:e.target.value})} placeholder="Nama Pemilik" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2" />
                    <input value={editLogDraft?.telepon || ''} onChange={(e)=>setEditLogDraft({...editLogDraft,telepon:e.target.value})} placeholder="No. Telepon" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2" />
                    <input value={editLogDraft?.keluhan || ''} onChange={(e)=>setEditLogDraft({...editLogDraft,keluhan:e.target.value})} placeholder="Keluhan" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 md:col-span-2" />
                    <input value={editLogDraft?.diagnosis || ''} onChange={(e)=>setEditLogDraft({...editLogDraft,diagnosis:e.target.value})} placeholder="Diagnosis" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 md:col-span-2" />
                    <select value={editLogDraft?.status || 'Masuk'} onChange={(e)=>setEditLogDraft({...editLogDraft,status:e.target.value})} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2">
                      <option>Masuk</option>
                      <option>Proses</option>
                      <option>Selesai</option>
                    </select>
                    <input value={editLogDraft?.estimasiBiaya ?? 0} onChange={(e)=>setEditLogDraft({...editLogDraft,estimasiBiaya:parseInt(e.target.value||'0')})} type="number" placeholder="tolong masukin harga" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={()=>{ setLogs(logs.map(ll => ll.id === l.id ? editLogDraft : ll)); setEditingLogId(null); setEditLogDraft(null); }} className="px-3 py-1 bg-cyan-600 text-white rounded">Simpan</button>
                    <button onClick={()=>{ setEditingLogId(null); setEditLogDraft(null); }} className="px-3 py-1 bg-slate-600 text-white rounded">Batal</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-sm text-white"><span>{l.tanggal} • {l.plat} • {l.merk} {l.model}</span><span className="text-cyan-300">{l.status}</span></div>
                  <div className="text-xs text-gray-300">Pemilik: {l.pemilik} • {l.telepon}</div>
                  <div className="text-xs text-gray-300">Keluhan: {l.keluhan}</div>
                  {l.diagnosis && <div className="text-xs text-gray-300">Diagnosis: {l.diagnosis}</div>}
                  <div className="text-xs text-gray-300">Estimasi Biaya: Rp {parseInt(l.estimasiBiaya||0).toLocaleString()}</div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={()=>updateLogStatus(l.id,'Proses')} className="px-2 py-1 bg-yellow-500 text-white rounded">Proses</button>
                    <button onClick={()=>updateLogStatus(l.id,'Selesai')} className="px-2 py-1 bg-green-600 text-white rounded">Selesai</button>
                    <button onClick={()=>{ setEditingLogId(l.id); setEditLogDraft({ ...l }); }} className="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
                    <button onClick={()=>removeLog(l.id)} className="px-2 py-1 bg-red-500 text-white rounded">Hapus</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}