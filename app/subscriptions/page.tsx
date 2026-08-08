'use client';

import { useMemo, useState } from 'react';

const sample = [
  { id: 'SUB-0001', client: 'ABC Petshop', plan: 'BAS Care Plan', fee: 2500, start: '2026-08-09', lastPaid: '2026-08-09', nextDue: '2026-09-09', status: 'ACTIVE' },
  { id: 'SUB-0002', client: 'Happy Paws', plan: 'POS Support Care', fee: 1500, start: '2026-07-20', lastPaid: '2026-08-20', nextDue: '2026-09-20', status: 'ACTIVE' },
  { id: 'SUB-0003', client: 'Juan Agri Supply', plan: 'Premium Care', fee: 3500, start: '2026-06-01', lastPaid: '2026-08-01', nextDue: '2026-09-01', status: 'PAST DUE' },
];

const peso = (n: number) => `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;

export default function SubscriptionsPage() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(sample);
  const mrr = useMemo(() => rows.filter(r => r.status !== 'CANCELLED').reduce((s, r) => s + r.fee, 0), [rows]);

  const addSubscription = () => {
    setRows(r => [...r, { id: `SUB-${String(r.length + 1).padStart(4, '0')}`, client: 'New Customer', plan: 'BAS Care Plan', fee: 2000, start: '2026-08-09', lastPaid: '—', nextDue: '2026-09-09', status: 'ACTIVE' }]);
    setOpen(false);
  };

  return (
    <main className="sub-page">
      <header className="sub-header">
        <div className="brand-lockup"><div className="bc-mark">BC</div><div><b>BLESSED COMPANIONS</b><small>Business Accounting System</small></div></div>
        <div><h1>Care Plan Subscriptions</h1><p>Monthly recurring service contracts for BAS customers.</p></div>
        <button className="primary" onClick={() => setOpen(true)}>+ New Subscription</button>
      </header>

      <section className="metrics">
        <div><span>Active Subscriptions</span><strong>{rows.filter(r => r.status === 'ACTIVE').length}</strong></div>
        <div><span>Monthly Recurring Revenue</span><strong>{peso(mrr)}</strong></div>
        <div><span>Past Due</span><strong className="danger">{rows.filter(r => r.status === 'PAST DUE').length}</strong></div>
        <div><span>Next Billing</span><strong>₱4,000</strong></div>
      </section>

      <section className="panel">
        <div className="panel-title"><div><b>Customer Care Plans</b><small>No fixed day-of-month is required. The next cycle is derived from the prior billing/payment event.</small></div><span className="chip">MONTHLY</span></div>
        <div className="table-wrap"><table><thead><tr><th>Subscription</th><th>Client</th><th>Plan</th><th>Monthly Fee</th><th>Last Paid</th><th>Next Due</th><th>Status</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.client}</td><td>{r.plan}</td><td>{peso(r.fee)}</td><td>{r.lastPaid}</td><td>{r.nextDue}</td><td><span className={`status ${r.status === 'ACTIVE' ? 'active' : 'past'}`}>{r.status}</span></td></tr>)}</tbody></table></div>
      </section>

      <section className="rule"><b>Billing rule</b><span>Subscription creation generates the recurring service agreement only. Each cycle creates an invoice/receivable. Payment must be recorded separately and follows BAS cash, Undeposited Funds, bank and reconciliation rules.</span></section>

      {open && <div className="overlay"><div className="modal"><div className="modal-head"><h2>New Care Plan Subscription</h2><button onClick={() => setOpen(false)}>×</button></div><label>Client<select><option>ABC Petshop</option><option>Happy Paws</option><option>Juan Agri Supply</option></select></label><label>Plan Name<input defaultValue="BAS Care Plan" /></label><label>Monthly Fee<input type="number" defaultValue="2000" /></label><label>Start Date<input type="date" defaultValue="2026-08-09" /></label><label>Billing Interval<select><option>Monthly</option></select></label><p className="hint">No billing day is required. The next cycle will be calculated from the prior billing/payment event.</p><div className="actions"><button onClick={() => setOpen(false)}>Cancel</button><button className="primary" onClick={addSubscription}>Save Subscription</button></div></div></div>}
    </main>
  );
}
