"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Progress } from "@/components/ui/progress"

const mockProducts = [
  { name: "iPhone 15 Pro Case", sales: 156, percentage: 85 },
  { name: "Samsung Charger", sales: 132, percentage: 72 },
  { name: "Wireless Earbuds", sales: 98, percentage: 54 },
  { name: "Screen Protector", sales: 87, percentage: 48 },
  { name: "USB Cable", sales: 76, percentage: 42 },
]

export function TopProducts() {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="bg-card rounded-2xl p-6 border border-border"
      style={{ boxShadow: "0 4px 20px rgba(15, 61, 62, 0.08)" }}
    >
      <h3 className="font-serif text-lg font-semibold mb-4">{t.topProducts}</h3>
      <div className="space-y-4">
        {mockProducts.map((product, index) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium truncate pr-4">{product.name}</span>
              <span className="text-muted-foreground shrink-0">{product.sales} sold</span>
            </div>
            <Progress value={product.percentage} className="h-2" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
