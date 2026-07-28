import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

export function Header({ title, subtitle, action }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
      <div className="page-header-actions">
        <div className="page-header-search">
          <Search size={16} className="page-header-search-icon" />
          <input type="text" placeholder="Cari..." className="page-header-search-input" />
        </div>
        <button className="page-header-notification">
          <Bell size={16} />
          <span className="page-header-notification-dot" />
        </button>
        {action && (
          <button onClick={action.onClick} className="btn btn-primary btn-sm">
            <Plus size={16} />
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
