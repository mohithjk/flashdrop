"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "./SplashScreen";
import { Navbar } from "./Navbar";
import { AnnouncementTicker } from "./AnnouncementTicker";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  // Only run splash screen once per session (optional, but good UX. For now we run it on every reload as requested)
  // We'll keep it simple: runs on initial mount.
  
  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : null}
      
      <div className={`transition-opacity duration-1000 ${showSplash ? "opacity-0 h-screen overflow-hidden" : "opacity-100 min-h-screen flex flex-col"}`}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <AnnouncementTicker />
          <Navbar />
        </div>
        <div className="pt-24 flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </>
  );
}
