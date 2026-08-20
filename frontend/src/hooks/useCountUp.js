import { useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function useCountUp(target, { duration = 2, decimals = 0 } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, target, { duration, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [isInView, target, duration, motionValue]);

  return { ref, rounded };
}
