import React from 'react';

const statusConfig = {
  PENDING: { label: 'Menunggu', className: 'status-pending' },
  COMPLETED: { label: 'Selesai', className: 'status-completed' },
  CANCELLED: { label: 'Dibatalkan', className: 'status-cancelled' },
  RESERVED: { label: 'Dijadwalkan', className: 'status-reserved' },
  RESCHEDULED: { label: 'Dijadwal Ulang', className: 'status-rescheduled' },
  active: { label: 'Aktif', className: 'status-active' },
  inactive: { label: 'Nonaktif', className: 'status-inactive' },
  paid: { label: 'Dibayar', className: 'status-paid' },
  pending: { label: 'Menunggu', className: 'status-pending-payment' },
  failed: { label: 'Gagal', className: 'status-failed' },
  cash: { label: 'Tunai', className: 'status-cash' },
  card: { label: 'Kartu', className: 'status-card' },
  transfer: { label: 'Transfer', className: 'status-transfer' },
};

export function StatusBadge({ status, size = 'sm' }) {
  const config = statusConfig[status] || { label: status, className: 'status-default' };
  return (
    <span className={`status-badge ${config.className} ${size === 'md' ? 'status-badge-md' : ''}`}>
      {config.label}
    </span>
  );
}
