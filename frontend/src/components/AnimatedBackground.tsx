import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Smooth dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black" />

      {/* Stylish animated gradient blobs */}
      {[...Array(6)].map((_, i) => {
        const size = Math.random() * 200 + 150;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full filter blur-3xl opacity-50"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle, ${
                i % 2 === 0
                  ? 'rgba(255, 115, 179, 0.25)' // pink
                  : 'rgba(129, 140, 248, 0.25)' // indigo
              } 0%, transparent 70%)`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 0.5 + 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Glowing shimmer dots */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm shadow-md"
          style={{
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8],
            scale: [1, 1.6],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
