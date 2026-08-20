import { motion } from "framer-motion";
import { useRef, useState } from "react";

export function MagneticButton({ as: As = "a", className = "", children, strength = 18, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: (x / rect.width) * strength, y: (y / rect.height) * strength });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const MotionTag = motion(As);

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
