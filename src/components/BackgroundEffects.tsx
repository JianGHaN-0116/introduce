"use client";

import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div
        className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, rgba(52,211,153,0.4) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
