import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/', label: '📊 Dashboard', exact: true },
  { to: '/companies', label: '🏢 Kompaniyalar' },
  { to: '/orders', label: '📦 Buyurtmalar' },
  { to: '/bonuses', label: '🎁 Bonuslar' },
  { to: '/promotions', label: '🔥 Aksiyalar' },
];

export default function Layout() {
  const navigate = useNavigate();
  const name = localStorage.getItem('full_name') || 'Admin';

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <aside style={{ width: 220, background: '#1e3a5f', color: 'white', padding: '20px 0' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #2d5a8e' }}>
          <h2 style={{ margin: 0, fontSize: 16 }}>🤝 B2B Tizim</h2>
          <p style={{ margin: '8px 0 0', fontSize: 12, opacity: 0.7 }}>{name}</p>
        </div>
        <nav style={{ marginTop: 20 }}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              style={({ isActive }) => ({
                display: 'block', padding: '12px 20px', color: 'white',
                textDecoration: 'none', background: isActive ? '#2d5a8e' : 'transparent',
                borderLeft: isActive ? '4px solid #4fc3f7' : '4px solid transparent',
                fontSize: 14
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          style={{ position: 'absolute', bottom: 20, left: 20, background: '#c0392b',
            color: 'white', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }}
        >
          Chiqish
        </button>
      </aside>
      <main style={{ flex: 1, padding: 30, background: '#f5f7fa', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
