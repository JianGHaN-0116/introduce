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
        className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle, rgba(8,145,178,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
