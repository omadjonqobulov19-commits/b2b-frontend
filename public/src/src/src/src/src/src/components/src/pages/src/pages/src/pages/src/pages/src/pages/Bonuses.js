import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Bonuses() {
  const [bonuses, setBonuses] = useState([]);

  useEffect(() => {
    api.get('/api/bonuses/').then(r => setBonuses(r.data));
  }, []);

  const s = {
    th: { background: '#1e3a5f', color: 'white', padding: '12px 16px', textAlign: 'left', fontSize: 13 },
    td: { padding: '12px 16px', borderBottom: '1px solid #eee', fontSize: 14 }
  };

  const total = bonuses.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div>
      <h2 style={{ color: '#1e3a5f', marginTop: 0 }}>🎁 Bonuslar Tarixi</h2>
      <div style={{ background: 'linear-gradient(135deg, #9b59b6, #6c3483)', color: 'white', borderRadius: 10, padding: 24, marginBottom: 24, display: 'inline-block', minWidth: 240 }}>
        <div style={{ fontSize: 14, opacity: 0.85 }}>Jami berilgan bonuslar</div>
        <div style={{ fontSize: 32, fontWeight: 'bold', marginTop: 8 }}>{total.toLocaleString()} so'm</div>
      </div>
      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{['#', 'Kompaniya', 'Bonus miqdori', 'Buyurtma #', 'Tavsif', 'Sana'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {bonuses.length === 0 ? (
              <tr><td colSpan={6} style={{ ...s.td, textAlign: 'center', color: '#999' }}>Bonuslar yo'q</td></tr>
            ) : bonuses.map((b, i) => (
              <tr key={b.id} style={{ background: i % 2 === 0 ? 'white' : '#f9f9f9' }}>
                <td style={s.td}>{i + 1}</td>
                <td style={{ ...s.td, fontWeight: 'bold' }}>{b.company_name}</td>
                <td style={{ ...s.td, color: '#9b59b6', fontWeight: 'bold' }}>+{b.amount?.toLocaleString()} so'm</td>
                <td style={s.td}>#{b.order_id}</td>
                <td style={s.td}>{b.description}</td>
                <td style={s.td}>{new Date(b.created_at).toLocaleDateString('uz-UZ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
