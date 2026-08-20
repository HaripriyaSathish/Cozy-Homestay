import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen({ visible, siteName }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-3xl tracking-wide text-cream"
          >
            {siteName}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 h-px overflow-hidden bg-cream/10"
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              className="h-full w-1/2 bg-gold"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
