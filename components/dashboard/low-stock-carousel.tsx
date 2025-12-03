"use client"

import { motion } from "framer-motion"
import { AlertTriangle, ChevronLeft, ChevronRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect } from "react"

export function LowStockCarousel() {
  const { t } = useLanguage()
  const { products } = useStore()
  const lowStockItems = products.filter((p) => p.quantity <= p.lowStockThreshold)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate carousel
  useEffect(() => {
    if (lowStockItems.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % lowStockItems.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [lowStockItems.length])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + lowStockItems.length) % lowStockItems.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % lowStockItems.length)
  }

  if (lowStockItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-card rounded-2xl border border-border p-6"
        style={{ boxShadow: "0 4px 20px rgba(5, 43, 34, 0.08)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-success" />
          <h3 className="font-serif text-lg font-semibold">{t.stockAlerts || "Stock Alerts"}</h3>
        </div>
        <div className="text-center py-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-success/20 flex items-center justify-center">
            <Package className="w-6 h-6 text-success" />
          </div>
          <p className="text-muted-foreground">{t.allStockHealthy || "All stock levels healthy!"}</p>
        </div>
      </motion.div>
    )
  }

  const currentItem = lowStockItems[currentIndex]
  const isCritical = currentItem.quantity === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className={`rounded-2xl border overflow-hidden ${
        isCritical ? "bg-destructive/10 border-destructive/30" : "bg-warning/10 border-warning/30"
      }`}
      style={{ boxShadow: "0 4px 20px rgba(5, 43, 34, 0.08)" }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${isCritical ? "text-destructive" : "text-warning"}`} />
            <h3 className="font-serif text-lg font-semibold">{t.stockAlerts || "Stock Alerts"}</h3>
          </div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              isCritical ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
            }`}
          >
            {lowStockItems.length} {t.items || "items"}
          </span>
        </div>

        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-3"
        >
          <div>
            <p className="font-medium text-lg">{currentItem.name}</p>
            <p className="text-sm text-muted-foreground">{currentItem.category}</p>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t.currentStock || "Current Stock"}</p>
              <p className={`font-serif text-3xl font-bold ${isCritical ? "text-destructive" : "text-warning"}`}>
                {currentItem.quantity}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{t.threshold || "Threshold"}</p>
              <p className="font-serif text-lg">{currentItem.lowStockThreshold}</p>
            </div>
          </div>
        </motion.div>

        {lowStockItems.length > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <Button variant="ghost" size="icon" onClick={goToPrev} className="h-8 w-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-1">
              {lowStockItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? "bg-primary" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={goToNext} className="h-8 w-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
