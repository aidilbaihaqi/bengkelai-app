import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import Header from "../components/Header";

export const meta = () => [{ title: "Stok Bengkel - BengkelAI" }];

export default function WorkshopStock() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ nama: "", brand: "", kategori: "mesin", stok: 0, harga: 0, satuan: "pcs" });
  const [message, setMessage] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editItemDraft, setEditItemDraft] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
      <Header title="Stok Sparepart" />

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
            <input value={newItem.stok} onChange={(e)=>setNewItem({...newItem,stok:parseInt(e.target.value||"0")})} type="number" placeholder="tolong masukin pieces" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newItem.harga} onChange={(e)=>setNewItem({...newItem,harga:parseInt(e.target.value||"0")})} type="number" placeholder="tolong masukin harga" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
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
              {editingItemId === i.id ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                  <input value={editItemDraft?.nama || ''} onChange={(e)=>setEditItemDraft({...editItemDraft,nama:e.target.value})} placeholder="Nama Barang" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
                  <input value={editItemDraft?.brand || ''} onChange={(e)=>setEditItemDraft({...editItemDraft,brand:e.target.value})} placeholder="Brand" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                  <select value={editItemDraft?.kategori || 'mesin'} onChange={(e)=>setEditItemDraft({...editItemDraft,kategori:e.target.value})} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
                    <option value="mesin">Mesin</option>
                    <option value="rem">Rem</option>
                    <option value="kelistrikan">Kelistrikan</option>
                    <option value="transmisi">Transmisi</option>
                    <option value="suspensi">Suspensi</option>
                    <option value="ban">Ban</option>
                  </select>
                  <input value={editItemDraft?.stok ?? 0} onChange={(e)=>setEditItemDraft({...editItemDraft,stok:parseInt(e.target.value||'0')})} type="number" placeholder="tolong masukin pieces" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                  <input value={editItemDraft?.harga ?? 0} onChange={(e)=>setEditItemDraft({...editItemDraft,harga:parseInt(e.target.value||'0')})} type="number" placeholder="tolong masukin harga" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                  <select value={editItemDraft?.satuan || 'pcs'} onChange={(e)=>setEditItemDraft({...editItemDraft,satuan:e.target.value})} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
                    <option>pcs</option>
                    <option>liter</option>
                    <option>set</option>
                  </select>
                  <div className="flex gap-2">
                    <button onClick={()=>{ setInventory(inventory.map(ii => ii.id === i.id ? editItemDraft : ii)); setEditingItemId(null); setEditItemDraft(null); }} className="px-3 py-1 bg-cyan-600 text-white rounded">Simpan</button>
                    <button onClick={()=>{ setEditingItemId(null); setEditItemDraft(null); }} className="px-3 py-1 bg-slate-600 text-white rounded">Batal</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-sm text-white"><span>{i.nama} • {i.brand} • {i.kategori}</span><span className="text-cyan-300">Stok: {i.stok} {i.satuan}</span></div>
                  <div className="text-xs text-gray-300">Harga: Rp {parseInt(i.harga||0).toLocaleString()}</div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={()=>adjustStock(i.id,1)} className="px-2 py-1 bg-green-600 text-white rounded">+1</button>
                    <button onClick={()=>adjustStock(i.id,-1)} className="px-2 py-1 bg-yellow-500 text-white rounded">-1</button>
                    <button onClick={()=>{ setEditingItemId(i.id); setEditItemDraft({ ...i }); }} className="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
                    <button onClick={()=>removeInventoryItem(i.id)} className="px-2 py-1 bg-red-500 text-white rounded">Hapus</button>
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