import { CreateDropForm } from "@/components/CreateDropForm";

export default function CreateDropPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight">Create Drop</h1>
        <p className="text-slate-400">Launch a new limited product into the wild.</p>
      </header>

      <div className="glass p-8 rounded-2xl border border-slate-800/60">
        <CreateDropForm />
      </div>
    </div>
  );
}
