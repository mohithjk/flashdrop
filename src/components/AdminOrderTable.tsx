"use client";

import { motion } from "framer-motion";
import { type Order } from "@/lib/db";

export function AdminOrderTable({ initialOrders }: { initialOrders: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-900/50 text-xs uppercase tracking-widest text-slate-500">
          <tr>
            <th className="px-6 py-4 font-medium">Order ID</th>
            <th className="px-6 py-4 font-medium">Phone Number</th>
            <th className="px-6 py-4 font-medium">Item</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">OTP Code</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50 text-sm">
          {initialOrders.map((order, i) => (
            <motion.tr 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={order.id} 
              className="hover:bg-white/5 transition-colors"
            >
              <td className="px-6 py-4 font-mono text-slate-300">{order.id}</td>
              <td className="px-6 py-4 text-slate-400">{order.buyer}</td>
              <td className="px-6 py-4 font-medium">{order.item}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                  order.status === 'Confirmed' ? 'bg-neon-emerald/20 text-neon-emerald' :
                  order.status === 'Pending' ? 'bg-amber-500/20 text-amber-500' :
                  order.status === 'Failed - Item Sold Out' ? 'bg-red-500/20 text-red-500' :
                  'bg-slate-700 text-slate-300'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-slate-500">
                {order.otp ? order.otp : "N/A"}
              </td>
            </motion.tr>
          ))}
          {initialOrders.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                No orders yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
