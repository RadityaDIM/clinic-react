import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import '../../styles/theme.css';

export function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
