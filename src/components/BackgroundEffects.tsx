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
        className="absolute -top-1/4 -right-1/4 w-[900px] h-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
