"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CreateDropForm() {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    specs: "",
    category: "Smartphones",
    condition: "Condition: Like New",
    badge: "",
    image: "",
    publishImmediately: false,
  });

  const handleFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData({ ...formData, image: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error("Failed to create drop");
      
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
      setFormData({ 
        title: "", price: "", specs: "", 
        category: "Smartphones", condition: "Condition: Like New", badge: "", image: "",
        publishImmediately: false 
      });
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Drag & Drop Zone */}
      <div 
        className={cn(
          "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer relative overflow-hidden group",
          isDragging ? "border-neon-emerald bg-neon-emerald/5" : "border-white/10 hover:border-white/30",
          formData.image ? "p-0 border-none" : ""
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { 
          e.preventDefault(); 
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
          }
        }}
        onClick={() => {
          document.getElementById('imageUpload')?.click();
        }}
      >
        <input 
          type="file" 
          id="imageUpload" 
          className="hidden" 
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />
        {formData.image ? (
          <div className="relative w-full h-64">
            <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-bold tracking-widest uppercase">Click to Change Image</span>
            </div>
          </div>
        ) : (
          <>
            <UploadCloud className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/80 font-medium tracking-wide">Drag & drop high-res images here</p>
            <p className="text-white/40 text-sm mt-2">Supports JPG, PNG, WEBP (Max 5MB) or Click to Browse</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-white/50">Title</label>
          <input 
            required
            type="text" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition-colors"
            placeholder="e.g. IPHONE 15 PRO"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-white/50">Price ($)</label>
          <input 
            required
            type="number" 
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition-colors"
            placeholder="999"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-white/50">Category</label>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition-colors appearance-none"
          >
            <option value="Smartphones">Smartphones</option>
            <option value="Audio">Audio</option>
            <option value="Laptops">Laptops</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-white/50">Condition</label>
          <input 
            type="text" 
            value={formData.condition}
            onChange={(e) => setFormData({...formData, condition: e.target.value})}
            className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition-colors"
            placeholder="Condition: Like New"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-white/50">Badge (Optional)</label>
          <input 
            type="text" 
            value={formData.badge}
            onChange={(e) => setFormData({...formData, badge: e.target.value})}
            className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition-colors"
            placeholder="⚡ 1 Left in Stock"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold tracking-widest uppercase text-white/50">Specifications (comma separated)</label>
        <input 
          type="text" 
          value={formData.specs}
          onChange={(e) => setFormData({...formData, specs: e.target.value})}
          className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition-colors"
          placeholder="A17 Pro chip, Titanium design..."
        />
      </div>

      <div className="flex items-center gap-3 py-4 border-y border-white/10">
        <div className="relative flex items-center">
          <input 
            type="checkbox" 
            id="publish"
            checked={formData.publishImmediately}
            onChange={(e) => setFormData({...formData, publishImmediately: e.target.checked})}
            className="peer sr-only"
          />
          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-emerald"></div>
        </div>
        <label htmlFor="publish" className="text-sm font-medium text-white/80 cursor-pointer">
          Publish Immediately (Triggers WhatsApp Webhook)
        </label>
      </div>

      <button 
        type="submit" 
        disabled={status !== "idle"}
        className="w-full h-14 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {status === "submitting" ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> EXECUTING...</>
        ) : status === "success" ? (
          <><CheckCircle className="w-5 h-5 text-neon-emerald" /> DROP LIVE</>
        ) : (
          "PUBLISH DROP"
        )}
      </button>
    </form>
  );
}
