import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import Header from "../components/Header";

export const meta = () => [{ title: "Sparepart Bengkel - BengkelAI" }];

export default function WorkshopSpareparts() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [marketItem, setMarketItem] = useState({ name: "", brand: "", category: "mesin", price: 0, image: "", stock: 0, description: "", compatibility: "", warranty: "Garansi standar" });
  const [editingItemId, setEditingItemId] = useState(null);
  const [editItemDraft, setEditItemDraft] = useState(null);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("bengkelMarketplaceItems") || "[]");
      setItems(list);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("bengkelMarketplaceItems", JSON.stringify(items));
  }, [items]);

  const addToMarketplace = () => {
    if (!marketItem.name || !marketItem.brand) return;
    const entry = { id: Date.now(), ...marketItem };
    setItems([entry, ...items]);
    setMarketItem({ name: "", brand: "", category: "mesin", price: 0, image: "", stock: 0, description: "", compatibility: "", warranty: "Garansi standar" });
    setMessage("Sparepart ditambahkan ke marketplace");
    setTimeout(() => setMessage(""), 2000);
  };

  const removeItem = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
      <Header title="Sparepart Bengkel" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Sparepart Bengkel</h1>
          <p className="text-cyan-300">Kelola daftar sparepart yang dijual ke marketplace</p>
          {message && <div className="mt-3 px-4 py-2 bg-green-500/20 text-green-300 border border-green-400/30 rounded-lg">{message}</div>}
        </div>

        <section className="bg-slate-800/60 border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Tambah Sparepart</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <input value={marketItem.name} onChange={(e)=>setMarketItem({...marketItem,name:e.target.value})} placeholder="Nama Produk" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={marketItem.brand} onChange={(e)=>setMarketItem({...marketItem,brand:e.target.value})} placeholder="Brand" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <select value={marketItem.category} onChange={(e)=>setMarketItem({...marketItem,category:e.target.value})} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
              <option value="mesin">Mesin</option>
              <option value="rem">Rem</option>
              <option value="kelistrikan">Kelistrikan</option>
              <option value="transmisi">Transmisi</option>
              <option value="suspensi">Suspensi</option>
              <option value="ban">Ban</option>
            </select>
            <input value={marketItem.price} onChange={(e)=>setMarketItem({...marketItem,price:parseInt(e.target.value||"0")})} type="number" placeholder="tolong masukin harga" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={marketItem.stock} onChange={(e)=>setMarketItem({...marketItem,stock:parseInt(e.target.value||"0")})} type="number" placeholder="tolong masukin pieces" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={marketItem.image} onChange={(e)=>setMarketItem({...marketItem,image:e.target.value})} placeholder="URL Gambar" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
            <input value={marketItem.compatibility} onChange={(e)=>setMarketItem({...marketItem,compatibility:e.target.value})} placeholder="Kompatibilitas" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
            <input value={marketItem.description} onChange={(e)=>setMarketItem({...marketItem,description:e.target.value})} placeholder="Deskripsi" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-3" />
          </div>
          <button onClick={addToMarketplace} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg">Kirim ke Marketplace</button>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">Daftar Sparepart Bengkel</h2>
          <div className="space-y-2">
            {items.length === 0 ? (
              <div className="text-gray-300">Belum ada item</div>
            ) : items.map(i => (
              <div key={i.id} className="p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg">
                {editingItemId === i.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
                    <input value={editItemDraft?.name || ''} onChange={(e)=>setEditItemDraft({...editItemDraft,name:e.target.value})} placeholder="Nama Produk" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                    <input value={editItemDraft?.brand || ''} onChange={(e)=>setEditItemDraft({...editItemDraft,brand:e.target.value})} placeholder="Brand" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                    <select value={editItemDraft?.category || 'mesin'} onChange={(e)=>setEditItemDraft({...editItemDraft,category:e.target.value})} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
                      <option value="mesin">Mesin</option>
                      <option value="rem">Rem</option>
                      <option value="kelistrikan">Kelistrikan</option>
                      <option value="transmisi">Transmisi</option>
                      <option value="suspensi">Suspensi</option>
                      <option value="ban">Ban</option>
                    </select>
                    <input value={editItemDraft?.price ?? 0} onChange={(e)=>setEditItemDraft({...editItemDraft,price:parseInt(e.target.value||'0')})} type="number" placeholder="tolong masukin harga" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                    <input value={editItemDraft?.stock ?? 0} onChange={(e)=>setEditItemDraft({...editItemDraft,stock:parseInt(e.target.value||'0')})} type="number" placeholder="tolong masukin pieces" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                    <input value={editItemDraft?.image || ''} onChange={(e)=>setEditItemDraft({...editItemDraft,image:e.target.value})} placeholder="URL Gambar" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
                    <input value={editItemDraft?.compatibility || ''} onChange={(e)=>setEditItemDraft({...editItemDraft,compatibility:e.target.value})} placeholder="Kompatibilitas" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
                    <input value={editItemDraft?.description || ''} onChange={(e)=>setEditItemDraft({...editItemDraft,description:e.target.value})} placeholder="Deskripsi" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-3" />
                    <div className="flex gap-2">
                      <button onClick={()=>{ setItems(items.map(ii => ii.id === i.id ? editItemDraft : ii)); setEditingItemId(null); setEditItemDraft(null); }} className="px-3 py-1 bg-cyan-600 text-white rounded">Simpan</button>
                      <button onClick={()=>{ setEditingItemId(null); setEditItemDraft(null); }} className="px-3 py-1 bg-slate-600 text-white rounded">Batal</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm text-white"><span>{i.name} • {i.brand} • {i.category}</span><span className="text-cyan-300">Stok: {i.stock}</span></div>
                    <div className="text-xs text-gray-300">Harga: Rp {parseInt(i.price||0).toLocaleString()}</div>
                    {i.description && <div className="text-xs text-gray-300">{i.description}</div>}
                    <div className="mt-2 flex gap-2">
                      <button onClick={()=>{ setEditingItemId(i.id); setEditItemDraft({ ...i }); }} className="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
                      <button onClick={()=>removeItem(i.id)} className="px-2 py-1 bg-red-500 text-white rounded">Hapus</button>
                      <Link to="/spare-parts" className="px-2 py-1 bg-cyan-600 text-white rounded">Lihat di Marketplace</Link>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}