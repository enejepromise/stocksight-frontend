"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { useLanguage } from "@/lib/language-context"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"

export function PendingApprovals() {
  const { t } = useLanguage()
  const { sales, approveSale, disputeSale } = useStore()
  const pendingSales = sales.filter((s) => s.status === "pending")
  const [processingId, setProcessingId] = useState<string | null>(null)

  const handleApprove = async (saleId: string) => {
    setProcessingId(saleId)
    // Simulate slight delay for UX
    await new Promise((r) => setTimeout(r, 300))
    approveSale(saleId)
    setProcessingId(null)
  }

  const handleDispute = async (saleId: string) => {
    setProcessingId(saleId)
    await new Promise((r) => setTimeout(r, 300))
    disputeSale(saleId)
    setProcessingId(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
      style={{ boxShadow: "0 4px 20px rgba(5, 43, 34, 0.08)" }}
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-warning" />
          <h3 className="font-serif text-lg font-semibold">{t.pendingApprovals || "Pending Approvals"}</h3>
        </div>
        {pendingSales.length > 0 && (
          <span className="px-2 py-1 text-xs font-medium bg-warning/20 text-warning rounded-full">
            {pendingSales.length} pending
          </span>
        )}
      </div>

      {pendingSales.length === 0 ? (
        <div className="p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-success/20 flex items-center justify-center">
            <Check className="w-6 h-6 text-success" />
          </div>
          <p className="text-muted-foreground">{t.noPendingSales || "All sales are approved!"}</p>
        </div>
      ) : (
        <div className="divide-y divide-border max-h-[350px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {pendingSales.map((sale, index) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, backgroundColor: "rgba(223, 255, 0, 0.2)" }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{sale.salesRepName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(sale.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {sale.items.map((i) => `${i.quantity}x ${i.productName}`).join(", ")}
                    </p>
                    <p className="font-serif font-semibold text-lg mt-1">₦{sale.totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                      onClick={() => handleDispute(sale.id)}
                      disabled={processingId === sale.id}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-9 w-9 bg-success hover:bg-success/90 text-success-foreground"
                      onClick={() => handleApprove(sale.id)}
                      disabled={processingId === sale.id}
                    >
                      {processingId === sale.id ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 border-2 border-success-foreground/30 border-t-success-foreground rounded-full"
                        />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
