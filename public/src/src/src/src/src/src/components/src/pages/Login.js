import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const form = new URLSearchParams();
      form.append('username', email);
      form.append('password', password);
      const res = await api.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('full_name', res.data.full_name);
      localStorage.setItem('is_admin', res.data.is_admin);
      navigate('/');
    } catch {
      setError('Email yoki parol noto\'g\'ri');
    } finally {
      setLoading(false);
    }
  };

  const s = {
    page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e3a5f' },
    card: { background: 'white', borderRadius: 12, padding: 40, width: 360, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' },
    title: { textAlign: 'center', color: '#1e3a5f', marginBottom: 8, fontSize: 24 },
    sub: { textAlign: 'center', color: '#666', marginBottom: 30, fontSize: 14 },
    label: { display: 'block', marginBottom: 6, color: '#333', fontWeight: 'bold', fontSize: 14 },
    input: { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, boxSizing: 'border-box', marginBottom: 16 },
    btn: { width: '100%', padding: '12px', background: '#1e3a5f', color: 'white', border: 'none', borderRadius: 6, fontSize: 16, cursor: 'pointer' },
    err: { background: '#fee', color: '#c00', padding: '10px', borderRadius: 6, marginBottom: 16, textAlign: 'center', fontSize: 14 }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h1 style={s.title}>🤝 B2B Tizim</h1>
        <p style={s.sub}>Aksiya va Bonuslar Boshqaruvi</p>
        {error && <div style={s.err}>{error}</div>}
        <form onSubmit={handleLogin}>
          <label style={s.label}>Email</label>
          <input style={s.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@b2b.uz" required />
          <label style={s.label}>Parol</label>
          <input style={s.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          <button style={s.btn} type="submit" disabled={loading}>{loading ? 'Kirish...' : 'Kirish'}</button
