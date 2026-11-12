"use client";

import { motion } from "framer-motion";

/** Re-mounts on every navigation: content fades up while a scan line sweeps past. */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[30vh] bg-linear-to-b from-transparent via-lime/10 to-transparent"
        initial={{ y: "-40vh", opacity: 1 }}
        animate={{ y: "120vh", opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
