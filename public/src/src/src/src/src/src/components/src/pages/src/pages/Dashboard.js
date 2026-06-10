import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../api';

const Card = ({ title, value, color, icon }) => (
  <div style={{ background: 'white', borderRadius: 10, padding: 24, flex: 1, minWidth: 180,
    borderTop: `4px solid ${color}`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
    <div style={{ fontSize: 28 }}>{icon}</div>
    <div style={{ fontSize: 28, fontWeight: 'bold', color, marginTop: 8 }}>{value}</div>
    <div style={{ color: '#666', fontSize: 13, marginTop: 4 }}>{title}</div>
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/api/reports/dashboard').then(r => setData(r.data)).catch(() => {});
  }, []);

  if (!data) return <div style={{ textAlign: 'center', marginTop: 60 }}>Yuklanmoqda...</div>;

  const chartData = data.top_companies.map(c => ({
    name: c.name.length > 12 ? c.name.slice(0, 12) + '...' : c.name,
    "Xarid (so'm)": c.total_spent,
    "Bonus (so'm)": c.bonus_balance
  }));

  return (
    <div>
      <h2 style={{ color: '#1e3a5f', marginTop: 0 }}>📊 Dashboard</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 30 }}>
        <Card title="Jami kompaniyalar" value={data.total_companies} color="#3498db" icon="🏢" />
        <Card title="Jami buyurtmalar" value={data.total_orders} color="#2ecc71" icon="📦" />
        <Card title="Jami daromad" value={`${(data.total_revenue).toLocaleString()} so'm`} color="#e67e22" icon="💰" />
        <Card title="Berilgan bonuslar" value={`${(data.total_bonuses_given).toLocaleString()} so'm`} color="#9b59b6" icon="🎁" />
        <Card title="Aktiv aksiyalar" value={data.active_promotions} color="#e74c3c" icon="🔥" />
      </div>
      <div style={{ background: 'white', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#1e3a5f', marginTop: 0 }}>Top 5 Kompaniyalar</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={v => `${v.toLocaleString()} so'm`} />
              <Bar dataKey="Xarid (so'm)" fill="#3498db" radius={[4,4,0,0]} />
