"use client"

import { motion } from "framer-motion"
import { Package, Receipt, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

interface QuickActionsProps {
  onAddProduct: () => void
  onRecordSale: () => void
}

export function QuickActions({ onAddProduct, onRecordSale }: QuickActionsProps) {
  const { t } = useLanguage()

  const actions = [
    { icon: Package, label: t.addProduct, onClick: onAddProduct, variant: "default" as const },
    { icon: Receipt, label: t.recordSale, onClick: onRecordSale, variant: "outline" as const },
    { icon: FileText, label: t.viewReports, onClick: () => {}, variant: "outline" as const },
    { icon: Users, label: t.manageUsers, onClick: () => {}, variant: "outline" as const },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="bg-card rounded-2xl p-6 border border-border"
      style={{ boxShadow: "0 4px 20px rgba(15, 61, 62, 0.08)" }}
    >
      <h3 className="font-serif text-lg font-semibold mb-4">{t.quickActions}</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
          >
            <Button
              variant={action.variant}
              className="w-full justify-start gap-2 h-auto py-3"
              onClick={action.onClick}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
