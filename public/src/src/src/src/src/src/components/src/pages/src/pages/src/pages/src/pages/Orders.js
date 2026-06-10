import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ company_id: '', amount: '', description: '' });
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => {
    api.get('/api/orders/').then(r => setOrders(r.data));
    api.get('/api/companies/').then(r => setCompanies(r.data));
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/orders/', { ...form, amount: parseFloat(form.amount), company_id: parseInt(form.company_id) });
      setMsg(`✅ Buyurtma qo'shildi! Bonus: ${res.data.bonus_added?.toLocaleString()} so'm (${res.data.bonus_percent}%)`);
      setForm({ company_id: '', amount: '', description: '' });
      setShowForm(false);
      load();
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Xatolik'));
    }
    setTimeout(() => setMsg(''), 4000);
  };

  const s = {
    btn: { background: '#1e3a5f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer' },
    input: { width: '100%', padding: '9px 12px', border: '1px solid #ddd', borderRadius: 6, marginBottom: 12, fontSize: 14, boxSizing: 'border-box' },
    th: { background: '#1e3a5f', color: 'white', padding: '12px 16px', textAlign: 'left', fontSize: 13 },
    td: { padding: '12px 16px', borderBottom: '1px solid #eee', fontSize: 14 }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ color: '#1e3a5f', margin: 0 }}>📦 Buyurtmalar</h2>
        <button style={s.btn} onClick={() => setShowForm(!showForm)}>+ Yangi buyurtma</button>
      </div>
      {msg && <div style={{ padding: 12, background: msg.startsWith('✅') ? '#d4edda' : '#f8d7da', borderRadius: 6, marginBottom: 16, fontWeight: 'bold' }}>{msg}</div>}
      {showForm && (
        <div style={{ background: 'white', padding: 24, borderRadius: 10, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginTop: 0, color: '#1e3a5f' }}>Yangi buyurtma</h3>
          <form onSubmit={submit}>
            <select style={s.input} value={form.company_id} onChange={e => setForm({...form, company_id: e.target.value})} required>
              <option value="">Kompaniyani tanlang *</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input style={s.input} type="number" placeholder="Summa (so'm) *" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />
            <input style={s.input} placeholder="Tavsif *" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
            <button style={s.btn} type="submit">Saqlash</button>
          </form>
        </div>
      )}
      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{['#', 'Kompaniya', 'Summa', 'Tavsif', 'Status', 'Sana'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={6} style={{ ...s.td, textAlign: 'center', color: '#999' }}>Buyurtmalar yo'q</td></tr>
            ) : orders.map((o, i) => (
              <tr key={o.id} style={{ background: i % 2 === 0 ? 'white' : '#f9f9f9' }}>
                <td style={s.td}>{i + 1}</td>
                <td style={{ ...s.td, fontWeight: 'bold' }}>{o.company_name}</td>
                <td style={{ ...s.td, color: '#27ae60', fontWeight: 'bold' }}>{o.amount?.toLocaleString()} so'm</td>
                <td style={s.td}>{o.description}</td>
                <td style={s.td}><span style={{ background: '#d4edda', color: '#155724', padding: '3px 10px', borderRadius: 12, fontSize: 12 }}>{o.status}</span></td>
                <td style={s.td}>{new Date(o.created_at).toLocaleDateString('uz-UZ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
