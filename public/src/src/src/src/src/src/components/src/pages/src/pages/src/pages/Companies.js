import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ name: '', stir: '', phone: '', address: '' });
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => api.get('/api/companies/').then(r => setCompanies(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/companies/', form);
      setMsg('✅ Kompaniya qo\'shildi!');
      setForm({ name: '', stir: '', phone: '', address: '' });
      setShowForm(false);
      load();
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Xatolik'));
    }
    setTimeout(() => setMsg(''), 3000);
  };

  const del = async (id) => {
    if (window.confirm('O\'chirishni tasdiqlaysizmi?')) {
      await api.delete(`/api/companies/${id}`);
      load();
    }
  };

  const s = {
    btn: { background: '#1e3a5f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontSize: 14 },
    input: { width: '100%', padding: '9px 12px', border: '1px solid #ddd', borderRadius: 6, marginBottom: 12, fontSize: 14, boxSizing: 'border-box' },
    th: { background: '#1e3a5f', color: 'white', padding: '12px 16px', textAlign: 'left', fontSize: 13 },
    td: { padding: '12px 16px', borderBottom: '1px solid #eee', fontSize: 14 }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ color: '#1e3a5f', margin: 0 }}>🏢 Kompaniyalar</h2>
        <button style={s.btn} onClick={() => setShowForm(!showForm)}>+ Yangi kompaniya</button>
      </div>
      {msg && <div style={{ padding: 12, background: msg.startsWith('✅') ? '#d4edda' : '#f8d7da', borderRadius: 6, marginBottom: 16 }}>{msg}</div>}
      {showForm && (
        <div style={{ background: 'white', padding: 24, borderRadius: 10, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginTop: 0, color: '#1e3a5f' }}>Yangi kompaniya qo'shish</h3>
          <form onSubmit={submit}>
            <input style={s.input} placeholder="Kompaniya nomi *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input style={s.input} placeholder="STIR raqami *" value={form.stir} onChange={e => setForm({...form, stir: e.target.value})} required />
            <input style={s.input} placeholder="Telefon raqami *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
            <input style={s.input} placeholder="Manzil *" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
            <button style={s.btn} type="submit">Saqlash</button>
          </form>
        </div>
      )}
      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{['#', 'Nomi', 'STIR', 'Telefon', 'Manzil', 'Bonus balansi', ''].map(h =
