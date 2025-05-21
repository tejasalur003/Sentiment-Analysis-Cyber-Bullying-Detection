import React, { useMemo } from "react";

const StaticBackground = () => {
  // Generate shimmer dots only once
  const shimmerDots = useMemo(() => {
    const count = 100; // Number of dots
    const dots = [];

    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * 3) + 2; // 2px to 4px
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      dots.push({ size, top, left });
    }

    return dots;
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black" />

      {/* Static glowing blobs */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full opacity-40 blur-3xl"
        style={{ top: "10%", left: "15%", background: "radial-gradient(circle, rgba(255,115,179,0.25), transparent 70%)" }}
      />
      <div
        className="absolute w-[250px] h-[250px] rounded-full opacity-40 blur-3xl"
        style={{ top: "40%", left: "60%", background: "radial-gradient(circle, rgba(129,140,248,0.25), transparent 70%)" }}
      />
      <div
        className="absolute w-[180px] h-[180px] rounded-full opacity-40 blur-3xl"
        style={{ bottom: "15%", right: "20%", background: "radial-gradient(circle, rgba(255,115,179,0.25), transparent 70%)" }}
      />
      <div
        className="absolute w-[220px] h-[220px] rounded-full opacity-40 blur-3xl"
        style={{ bottom: "20%", left: "10%", background: "radial-gradient(circle, rgba(129,140,248,0.25), transparent 70%)" }}
      />

      {/* Static shimmer dots (randomized once) */}
      {shimmerDots.map((dot, index) => (
        <div
          key={`dot-${index}`}
          className="absolute rounded-full bg-white/20 shadow-md"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            top: `${dot.top}%`,
            left: `${dot.left}%`,
          }}
        />
      ))}
    </div>
  );
};

export default StaticBackground;
