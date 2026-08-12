import { Activity } from "lucide-react";
import { readDB } from "@/lib/db";
import { AdminOrderTable } from "@/components/AdminOrderTable";
import { SalesChart } from "@/components/SalesChart";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const db = await readDB();
  const orders = db.orders;

  // Calculate revenue based on orders
  let revenue = 0;
  orders.forEach(order => {
    const product = db.products.find(p => p.title === order.item);
    if (product) revenue += product.price;
  });

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight">Command Center</h1>
        <p className="text-slate-400">Real-time pulse of live drops.</p>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-3 text-slate-400 mb-2 uppercase text-xs font-bold tracking-widest">
            <Activity className="w-4 h-4 text-neon-blue" />
            Active Visitors
          </div>
          <div className="text-4xl font-mono text-white">4,281</div>
        </div>
        <div className="glass p-6 rounded-xl border border-slate-800/60">
          <div className="text-slate-400 mb-2 uppercase text-xs font-bold tracking-widest">
            Sales Velocity
          </div>
          <SalesChart />
        </div>
        <div className="glass p-6 rounded-xl border border-slate-800/60">
          <div className="text-slate-400 mb-2 uppercase text-xs font-bold tracking-widest">
            Total Revenue
          </div>
          <div className="text-4xl font-mono text-neon-emerald">
            ${revenue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Order Feed */}
      <div className="glass rounded-xl border border-slate-800/60 overflow-hidden">
        <div className="p-6 border-b border-slate-800/60 flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase tracking-widest">Live Order Feed</h2>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs text-red-500 font-medium uppercase tracking-wider">Live</span>
          </div>
        </div>
        
        <AdminOrderTable initialOrders={orders} />
      </div>
    </div>
  );
}
