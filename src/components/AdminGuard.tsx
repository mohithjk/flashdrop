"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const sessionStr = localStorage.getItem("flashdrop_session");
    if (!sessionStr) {
      router.replace("/");
      return;
    }
    try {
      const session = JSON.parse(sessionStr);
      if (session.role === "admin") {
        setIsAuthorized(true);
      } else {
        router.replace("/");
      }
    } catch (e) {
      router.replace("/");
    }
  }, [router]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return <>{children}</>;
}
