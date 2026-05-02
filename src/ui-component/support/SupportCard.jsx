import React, { useState, useMemo } from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    Open:    { background: '#e0f5f2', color: '#077a6d' },
    Pending: { background: '#fef3dc', color: '#8a5c00' },
    Closed:  { background: '#f0f0ee', color: '#7a8a88' },
  };
  return (
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, ...styles[status] }}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    High:   { background: '#fde8e8', color: '#a02020' },
    Medium: { background: '#fef3dc', color: '#8a5c00' },
    Low:    { background: '#f0f0ee', color: '#7a8a88' },
  };
  return (
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, ...styles[priority] }}>
      {priority}
    </span>
  );
};

const TICKETS = [
  { id: '#TKT-041', subject: 'Token not generated for walk-ins', vendor: 'MediCare Hospital', dept: 'OPD', priority: 'High', status: 'Open', date: '01 May 2026', body: 'Token generation is failing for walk-in patients since 10 AM today. Pre-booked slot tokens work fine. This is causing a long queue at the OPD counter.' },
  { id: '#TKT-040', subject: 'Login error after password reset', vendor: 'GlobalCare Hospital', dept: 'Lab', priority: 'High', status: 'Open', date: '01 May 2026', body: 'Unable to log in to the vendor portal after a password reset. New credentials are being rejected with an "Invalid credentials" error on every attempt.' },
  { id: '#TKT-039', subject: 'Duplicate tokens being issued', vendor: 'Aster Medcity', dept: 'Radiology', priority: 'Medium', status: 'Pending', date: '30 Apr 2026', body: 'Two tokens are being assigned to the same patient for the same time slot. This has occurred 3 times today in the Radiology department.' },
  { id: '#TKT-038', subject: 'Patient record not visible', vendor: 'LifeCare Hospital', dept: 'Surgery', priority: 'Medium', status: 'Pending', date: '30 Apr 2026', body: 'A patient record created yesterday is no longer visible in the vendor dashboard. The token is still active but shows no patient details.' },
  { id: '#TKT-037', subject: 'Slot timing mismatch', vendor: 'MediCare Hospital', dept: 'ENT', priority: 'Low', status: 'Closed', date: '28 Apr 2026', body: 'Slot timings displayed to patients were off by 30 minutes. Resolved by re-syncing the department schedule from the admin panel.' },
];

const SupportCard = ({ onSelectTicket }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const stats = useMemo(() => ({
    total:   TICKETS.length,
    open:    TICKETS.filter(t => t.status === 'Open').length,
    pending: TICKETS.filter(t => t.status === 'Pending').length,
    closed:  TICKETS.filter(t => t.status === 'Closed').length,
  }), []);

  const filtered = useMemo(() => {
    return TICKETS.filter(t => {
      const matchFilter = filter === 'All' || t.status === filter;
      const q = search.toLowerCase();
      const matchSearch = !q || t.subject.toLowerCase().includes(q) || t.vendor.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  const handleSelect = (ticket) => {
    setSelectedId(ticket.id);
    onSelectTicket(ticket);
  };

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Banner */}
      <div style={{ background: '#f5fafa', border: '1px solid #d4eeea', borderRadius: 10, padding: '18px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1a3a38', marginBottom: 4 }}>Support Management 🎧</div>
        <div style={{ fontSize: 13, color: '#6a9a96' }}>Review and respond to vendor support requests across the platform.</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Support Requests', value: stats.total,   sub: '3 new today',    subColor: '#0e9e8e', iconBg: '#e0f5f2', iconStroke: '#0e9e8e' },
          { label: 'Open',             value: stats.open,    sub: 'Awaiting reply',  subColor: '#0e9e8e', iconBg: '#e0f5f2', iconStroke: '#0e9e8e' },
          { label: 'Pending',          value: stats.pending, sub: 'In progress',     subColor: '#c9860a', iconBg: '#fef3dc', iconStroke: '#c9860a' },
          { label: 'Closed',           value: stats.closed,  sub: 'Resolved',        subColor: '#9ab8b5', iconBg: '#e5f7ef', iconStroke: '#1a9e6a' },
        ].map(({ label, value, sub, subColor, iconBg, iconStroke }) => (
          <div key={label} style={{ background: '#fff', border: '1px solid #e0f0ee', borderRadius: 10, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7aaeaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#1a3a38', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 12, marginTop: 5, fontWeight: 600, color: subColor }}>{sub}</div>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: '#fff', border: '1px solid #e0f0ee', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0faf9' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1a3a38' }}>Vendor Support Requests</span>
          <span style={{ fontSize: 12, color: '#0e9e8e', fontWeight: 600, cursor: 'pointer' }}>View all →</span>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderBottom: '1px solid #f0faf9', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 140, position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)' }} width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#9ab8b5" strokeWidth={2}>
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              style={{ width: '100%', height: 32, border: '1px solid #d4eeea', borderRadius: 8, padding: '0 10px 0 32px', fontSize: 12, fontFamily: "'Nunito', sans-serif", background: '#f8fdfc', color: '#2a4a47', outline: 'none' }}
              placeholder="Search tickets…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['All', 'Open', 'Pending', 'Closed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 6, border: filter === f ? '1px solid #0e9e8e' : '1px solid #d4eeea', background: filter === f ? '#0e9e8e' : '#f8fdfc', color: filter === f ? '#fff' : '#7aaeaa', cursor: 'pointer' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Ticket ID', 'Subject', 'Vendor', 'Priority', 'Status', 'Action'].map(h => (
                <th key={h} style={{ fontSize: 11, fontWeight: 700, color: '#7aaeaa', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '9px 20px', textAlign: 'left', background: '#f8fdfc', borderBottom: '1px solid #f0faf9' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#9ab8b5', fontSize: 13 }}>No tickets found</td></tr>
            ) : filtered.map(t => (
              <tr
                key={t.id}
                style={{ background: selectedId === t.id ? '#f0faf9' : 'transparent', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => { if (selectedId !== t.id) e.currentTarget.style.background = '#f8fdfc'; }}
                onMouseLeave={e => { if (selectedId !== t.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={{ fontSize: 12, fontWeight: 700, color: '#7aaeaa', padding: '11px 20px', borderBottom: '1px solid #f8fdfc' }}>{t.id}</td>
                <td style={{ fontSize: 13, fontWeight: 600, color: '#2a4a47', padding: '11px 20px', borderBottom: '1px solid #f8fdfc' }}>{t.subject}</td>
                <td style={{ fontSize: 13, color: '#5a8a85', padding: '11px 20px', borderBottom: '1px solid #f8fdfc' }}>{t.vendor}</td>
                <td style={{ padding: '11px 20px', borderBottom: '1px solid #f8fdfc' }}><PriorityBadge priority={t.priority} /></td>
                <td style={{ padding: '11px 20px', borderBottom: '1px solid #f8fdfc' }}><StatusBadge status={t.status} /></td>
                <td style={{ padding: '11px 20px', borderBottom: '1px solid #f8fdfc' }}>
                  <button
                    onClick={() => handleSelect(t)}
                    style={{ fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 6, border: '1px solid #c0e4de', background: '#f0faf9', color: '#0e9e8e', cursor: 'pointer' }}
                  >
                    View →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportCard;