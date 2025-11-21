import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

export const meta = () => [{ title: "Stok Bengkel - BengkelAI" }];

export default function WorkshopStock() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ nama: "", brand: "", kategori: "mesin", stok: 0, harga: 0, satuan: "pcs" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const savedInv = JSON.parse(localStorage.getItem("workshopInventory") || "[]");
      setInventory(savedInv);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("workshopInventory", JSON.stringify(inventory));
  }, [inventory]);

  const addInventoryItem = () => {
    if (!newItem.nama) return;
    const item = { id: Date.now(), ...newItem };
    setInventory([item, ...inventory]);
    setNewItem({ nama: "", brand: "", kategori: "mesin", stok: 0, harga: 0, satuan: "pcs" });
    setMessage("Barang ditambahkan ke stok");
    setTimeout(() => setMessage(""), 2000);
  };

  const adjustStock = (id, delta) => {
    setInventory(inventory.map(i => i.id === id ? { ...i, stok: Math.max(0, i.stok + delta) } : i));
  };

  const removeInventoryItem = (id) => setInventory(inventory.filter(i => i.id !== id));

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
            <Link to="/workshop-logs" className="text-gray-300 hover:text-white">Log</Link>
            <Link to="/workshop-stock" className="text-cyan-400">Stok</Link>
            <Link to="/workshop-spareparts" className="text-gray-300 hover:text-white">Sparepart</Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard User</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Stok Sparepart Bengkel</h1>
          <p className="text-cyan-300">Kelola stok sparepart di bengkel</p>
          {message && <div className="mt-3 px-4 py-2 bg-green-500/20 text-green-300 border border-green-400/30 rounded-lg">{message}</div>}
        </div>

        <div className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input value={newItem.nama} onChange={(e)=>setNewItem({...newItem,nama:e.target.value})} placeholder="Nama Barang" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
            <input value={newItem.brand} onChange={(e)=>setNewItem({...newItem,brand:e.target.value})} placeholder="Brand" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <select value={newItem.kategori} onChange={(e)=>setNewItem({...newItem,kategori:e.target.value})} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
              <option value="mesin">Mesin</option>
              <option value="rem">Rem</option>
              <option value="kelistrikan">Kelistrikan</option>
              <option value="transmisi">Transmisi</option>
              <option value="suspensi">Suspensi</option>
              <option value="ban">Ban</option>
            </select>
            <input value={newItem.stok} onChange={(e)=>setNewItem({...newItem,stok:parseInt(e.target.value||"0")})} type="number" placeholder="Stok" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newItem.harga} onChange={(e)=>setNewItem({...newItem,harga:parseInt(e.target.value||"0")})} type="number" placeholder="Harga (Rp)" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <select value={newItem.satuan} onChange={(e)=>setNewItem({...newItem,satuan:e.target.value})} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
              <option>pcs</option>
              <option>liter</option>
              <option>set</option>
            </select>
          </div>
          <button onClick={addInventoryItem} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg">Tambah ke Stok</button>
        </div>

        <div className="mt-6 space-y-2">
          {inventory.length === 0 ? (
            <div className="text-gray-300">Belum ada barang</div>
          ) : inventory.map(i => (
            <div key={i.id} className="p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg">
              <div className="flex justify-between text-sm text-white"><span>{i.nama} • {i.brand} • {i.kategori}</span><span className="text-cyan-300">Stok: {i.stok} {i.satuan}</span></div>
              <div className="text-xs text-gray-300">Harga: Rp {parseInt(i.harga||0).toLocaleString()}</div>
              <div className="mt-2 flex gap-2">
                <button onClick={()=>adjustStock(i.id,1)} className="px-2 py-1 bg-green-600 text-white rounded">+1</button>
                <button onClick={()=>adjustStock(i.id,-1)} className="px-2 py-1 bg-yellow-500 text-white rounded">-1</button>
                <button onClick={()=>removeInventoryItem(i.id)} className="px-2 py-1 bg-red-500 text-white rounded">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}