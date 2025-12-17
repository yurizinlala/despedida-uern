import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CounterProps {
  value: number | string;
  className?: string;
  suffix?: string;
  prefix?: string;
}

const Counter: React.FC<CounterProps> = ({ value, className, suffix = "", prefix = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 2
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Handle parsing numeric value from string (e.g., "8.500" -> 8500)
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^0-9.-]+/g,"")) 
    : value;

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [motionValue, isInView, numericValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Format nicely (e.g. 1.000) if needed, or just Int
        // Check if original input had decimals
        const isFloat = numericValue % 1 !== 0;
        const formatted = isFloat ? latest.toFixed(1) : Math.floor(latest).toLocaleString('pt-BR');
        
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
  }, [springValue, suffix, prefix, numericValue]);

  return <span ref={ref} className={className} />;
};

export default Counter;