"use client";

import { motion } from "framer-motion";
import { type User } from "@/lib/db";

export function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-900/50 text-xs uppercase tracking-widest text-slate-500">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Phone Number</th>
            <th className="px-6 py-4 font-medium">Date Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50 text-sm">
          {users.map((user, i) => (
            <motion.tr 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={user.phone} 
              className="hover:bg-white/5 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-slate-200">{user.name}</td>
              <td className="px-6 py-4 font-mono text-slate-400">{user.phone}</td>
              <td className="px-6 py-4 text-slate-500">{user.joinedAt}</td>
            </motion.tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                No users registered yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
