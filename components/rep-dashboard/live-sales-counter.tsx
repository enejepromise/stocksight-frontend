"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"

interface LiveSalesCounterProps {
  totalSales: number
}

export function LiveSalesCounter({ totalSales }: LiveSalesCounterProps) {
  const [displayValue, setDisplayValue] = useState(totalSales)
  const count = useMotionValue(displayValue)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    const controls = animate(count, totalSales, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })
    return controls.stop
  }, [totalSales, count])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      key={totalSales}
      className="bg-[#052B22] rounded-2xl p-4 sm:p-6 text-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-xs sm:text-sm mb-1">Today&apos;s Sales</p>
          <motion.p
            className="font-serif text-2xl sm:text-4xl font-bold text-[#DFFF00]"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
            key={totalSales}
          >
            ₦{displayValue.toLocaleString("en-NG")}
          </motion.p>
        </div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#DFFF00] flex items-center justify-center shrink-0">
          <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-[#052B22]" />
        </div>
      </div>
    </motion.div>
  )
}
