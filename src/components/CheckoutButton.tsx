"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Lock, KeyRound, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type CheckoutState = "idle" | "loading_otp" | "input_otp" | "verifying" | "success" | "error";

interface CheckoutButtonProps {
  productId: string;
  isSoldOut: boolean;
}

export function CheckoutButton({ productId, isSoldOut }: CheckoutButtonProps) {
  const [status, setStatus] = useState<CheckoutState>("idle");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [orderId, setOrderId] = useState("");
  const [simulatedMessage, setSimulatedMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Get phone from the global session established at login
    const sessionStr = localStorage.getItem("flashdrop_session");
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.phone) setPhone(session.phone);
      } catch (e) {}
    }
  }, []);

  const handleRequestOTP = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (isSoldOut || status !== "idle" || !phone) return;

    setStatus("loading_otp");
    
    try {
      const response = await fetch("/api/orders/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, phone })
      });

      if (!response.ok) throw new Error("Failed to initiate");
      const data = await response.json();
      
      setOrderId(data.orderId);
      setStatus("input_otp");
      
      // Simulate SMS arriving
      setTimeout(() => {
        setSimulatedMessage(`Your FlashDrop code is ${data.simulatedOtp}`);
        setTimeout(() => setSimulatedMessage(""), 8000);
      }, 1000);

    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "input_otp" || !otp || !orderId) return;

    setStatus("verifying");

    try {
      const response = await fetch("/api/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, otpCode: otp })
      });

      if (!response.ok) throw new Error("Invalid OTP");
      
      setStatus("success");
      setSimulatedMessage(""); // Hide SMS if visible

      // Refresh the page to reflect sold out status
      setTimeout(() => {
        router.refresh();
      }, 1500);

    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => {
        setStatus("input_otp");
        setOtp("");
      }, 2000);
    }
  };

  return (
    <>
      {/* Simulated SMS Toast */}
      <AnimatePresence>
        {simulatedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[99999] bg-[#1a1a1a] border border-white/20 rounded-2xl shadow-2xl p-4 flex items-start gap-4 min-w-[300px]"
          >
            <div className="p-2 bg-green-500/20 text-green-500 rounded-full">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Messages • Now</p>
              <p className="text-sm font-medium text-white">{simulatedMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full relative h-14">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Default Button */}
          {status === "idle" && (
            <motion.button
              key="idle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onClick={handleRequestOTP}
              disabled={isSoldOut || !phone}
              className={cn(
                "absolute inset-0 w-full h-full rounded-xl font-bold text-lg tracking-wide flex items-center justify-center gap-2 transition-all duration-300",
                isSoldOut || !phone
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                  : "bg-white text-black hover:bg-slate-200 active:scale-[0.98]"
              )}
            >
              {isSoldOut ? (
                "SOLD OUT"
              ) : !phone ? (
                "LOGIN REQUIRED"
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  SECURE DROP
                </>
              )}
            </motion.button>
          )}

          {/* Step 2: Loading OTP */}
          {status === "loading_otp" && (
            <motion.div
              key="loading_otp"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-black bg-white rounded-xl font-bold tracking-widest"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              SENDING SMS...
            </motion.div>
          )}

          {/* Step 3: OTP Input Form */}
          {status === "input_otp" && (
            <motion.form
              key="input_otp"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleVerifyOTP}
              className="absolute inset-0 w-full h-full flex rounded-xl overflow-hidden bg-[#111] border border-neon-emerald"
            >
              <div className="flex items-center justify-center px-4 bg-neon-emerald/10 border-r border-neon-emerald/20 text-neon-emerald">
                <KeyRound className="w-5 h-5" />
              </div>
              <input 
                type="text"
                autoFocus
                required
                maxLength={4}
                placeholder="4-Digit Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex-1 bg-transparent px-4 text-white placeholder-white/30 focus:outline-none font-mono tracking-[0.5em]"
              />
              <button 
                type="submit"
                className="px-6 bg-neon-emerald text-black font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors"
              >
                Verify
              </button>
            </motion.form>
          )}

          {/* Step 4: Verifying */}
          {status === "verifying" && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center gap-3 w-full h-full text-black bg-neon-emerald rounded-xl font-bold tracking-widest"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              VERIFYING...
            </motion.div>
          )}

          {/* Success */}
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center gap-2 w-full h-full text-white bg-neon-emerald rounded-xl font-bold tracking-widest"
            >
              <Check className="w-6 h-6" />
              ORDER CONFIRMED
            </motion.div>
          )}

          {/* Error */}
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center gap-2 w-full h-full text-white bg-red-500 rounded-xl font-bold tracking-widest text-sm"
            >
              ERROR / INVALID CODE
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </>
  );
}
