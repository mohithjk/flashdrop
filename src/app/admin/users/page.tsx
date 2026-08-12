import { readDB } from "@/lib/db";
import { UsersTable } from "@/components/UsersTable";

// Disable caching for this route so it's always fresh
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminUsersPage() {
  const db = await readDB();
  const users = db.users || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Customer Database</h1>
          <p className="text-slate-400">Total Registered Users: {users.length}</p>
        </div>
      </header>

      <div className="glass rounded-2xl border border-slate-800/60 overflow-hidden">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
