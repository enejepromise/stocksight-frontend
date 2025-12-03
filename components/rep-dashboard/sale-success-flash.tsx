"use client"

import { motion, AnimatePresence } from "framer-motion"

interface SaleSuccessFlashProps {
  show: boolean
}

export function SaleSuccessFlash({ show }: SaleSuccessFlashProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] pointer-events-none bg-electric-lemon"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center h-full"
          >
            <div className="text-center">
              <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="text-6xl mb-4">
                ✓
              </motion.div>
              <p className="font-serif text-3xl font-bold text-foreground">Sale Recorded!</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
