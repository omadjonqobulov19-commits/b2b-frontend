import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Promotions() {
  const [promos, setPromos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', discount_percent: '', bonus_percent: '5', start_date: '', end_date: '' });
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => api.get('/api/promotions/').then(r => setPromos(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/promotions/', {
        ...form,
        discount_percent: parseFloat(form.discount_percent),
        bonus_percent: parseFloat(form.bonus_percent),
        start_date: new Date(form.start_date).toISOString(),
        end_date: new Date(form.end_date).toISOString()
      });
      setMsg('✅ Aksiya qo\'shildi!');
      setForm({ title: '', description: '', discount_percent: '', bonus_percent: '5', start_date: '', end_date: '' });
      setShowForm(false);
      load();
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Xatolik'));
    }
    setTimeout(() => setMsg(''), 3000);
  };

  const toggle = async (id) => {
    await api.put(`/api/promotions/${id}/toggle`);
    load();
  };

  const del = async (id) => {
    if (window.confirm('O\'chirishni tasdiqlaysizmi?')) {
      await api.delete(`/api/promotions/${id}`);
      load();
    }
  };

  const s = {
    btn: { background: '#1e3a5f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer' },
    input: { width: '100%', padding: '9px 12px', border: '1px solid #ddd', borderRadius: 6, marginBottom: 12, fontSize: 14, boxSizing: 'border-box' },
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ color: '#1e3a5f', margin: 0 }}>🔥 Aksiyalar</h2>
        <button style={s.btn} onClick={() => setShowForm(!showForm)}>+ Yangi aksiya</button>
      </div>
      {msg && <div style={{ padding: 12, background: msg.startsWith('✅') ? '#d4edda' : '#f8d7da', borderRadius: 6, marginBottom: 16 }}>{msg}</div>}
      {showForm && (
        <div style={{ background: 'white', padding: 24, borderRadius: 10, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginTop: 0, color: '#1e3a5f' }}>Yangi aksiya yaratish</h3>
          <form onSubmit={submit}>
            <input style={s.input} placeholder="Aksiya nomi *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            <input style={s.input} placeholder="Tavsif *" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
            <input style={s.input} type="number" placeholder="Chegirma % *" value={form.discount_percent} onChange={e => setForm({...form, discount_percent: e.target.value})} required />
            <input style={s.input} type="number" placehol
