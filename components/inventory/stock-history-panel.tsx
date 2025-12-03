"use client"

import { motion } from "framer-motion"
import { useStore, type Product } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Package, ArrowUp, ArrowDown, Edit } from "lucide-react"

interface StockHistoryPanelProps {
  product: Product
}

export function StockHistoryPanel({ product }: StockHistoryPanelProps) {
  const { stockLogs } = useStore()
  const productLogs = stockLogs.filter((log) => log.productId === product.id)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "add":
        return <ArrowUp className="w-4 h-4 text-success" />
      case "sale":
        return <ArrowDown className="w-4 h-4 text-destructive" />
      case "adjustment":
        return <Edit className="w-4 h-4 text-primary" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "add":
        return <Badge className="bg-success/10 text-success">Stock Added</Badge>
      case "sale":
        return <Badge className="bg-destructive/10 text-destructive">Sale</Badge>
      case "adjustment":
        return <Badge className="bg-primary/10 text-primary">Adjustment</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/30 rounded-xl">
        <p className="text-sm text-muted-foreground">Stock history for</p>
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Current stock:{" "}
          <span className="font-serif font-semibold text-foreground">
            {product.quantity} {product.unit}
          </span>
        </p>
      </div>

      {productLogs.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No stock history yet</p>
          <p className="text-sm text-muted-foreground">Stock changes will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {productLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                {getTypeIcon(log.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getTypeBadge(log.type)}
                  <span className="text-sm text-muted-foreground">by {log.userName}</span>
                </div>
                <p className="font-serif font-semibold">
                  {log.type === "add" ? "+" : "-"}
                  {log.quantity} {product.unit}
                </p>
                <p className="text-sm text-muted-foreground">
                  {log.previousQuantity} → {log.newQuantity}
                </p>
                {log.note && <p className="text-sm text-muted-foreground mt-1 italic">"{log.note}"</p>}
              </div>
              <div className="text-right text-xs text-muted-foreground shrink-0">
                {new Date(log.createdAt).toLocaleDateString()}
                <br />
                {new Date(log.createdAt).toLocaleTimeString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
