"use client"

import { useStore, type Sale } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, X, Clock, CheckCircle, XCircle } from "lucide-react"

interface SaleDetailsPanelProps {
  sale: Sale
  onClose: () => void
}

export function SaleDetailsPanel({ sale, onClose }: SaleDetailsPanelProps) {
  const { approveSale, disputeSale } = useStore()

  const handleApprove = () => {
    approveSale(sale.id)
    onClose()
  }

  const handleDispute = () => {
    disputeSale(sale.id)
    onClose()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1">
            <CheckCircle className="w-3 h-3" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-accent/50 text-accent-foreground border-accent gap-1">
            <Clock className="w-3 h-3" />
            Pending Review
          </Badge>
        )
      case "disputed":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
            <XCircle className="w-3 h-3" />
            Disputed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Sale ID</p>
          <p className="font-mono font-semibold">#{sale.id.slice(-6)}</p>
        </div>
        {getStatusBadge(sale.status)}
      </div>

      <Separator />

      {/* Sale Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="font-medium">{new Date(sale.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Time</p>
          <p className="font-medium">{new Date(sale.createdAt).toLocaleTimeString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Sales Rep</p>
          <p className="font-medium">{sale.salesRepName}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Payment Method</p>
          <p className="font-medium capitalize">{sale.paymentMethod}</p>
        </div>
      </div>

      <Separator />

      {/* Items */}
      <div>
        <h3 className="font-semibold mb-4">Items Sold</h3>
        <div className="space-y-3">
          {sale.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × ₦{item.unitPrice.toLocaleString("en-NG")}
                </p>
              </div>
              <p className="font-serif font-semibold">₦{item.total.toLocaleString("en-NG")}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Total */}
      <div className="p-4 bg-primary/5 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="font-medium">Total Amount</span>
          <span className="font-serif text-2xl font-semibold">₦{sale.totalAmount.toLocaleString("en-NG")}</span>
        </div>
      </div>

      {/* Actions */}
      {sale.status === "pending" && (
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 text-destructive border-destructive/20 hover:bg-destructive/10 bg-transparent"
            onClick={handleDispute}
          >
            <X className="w-4 h-4 mr-2" />
            Dispute
          </Button>
          <Button className="flex-1" onClick={handleApprove}>
            <Check className="w-4 h-4 mr-2" />
            Approve
          </Button>
        </div>
      )}
    </div>
  )
}
