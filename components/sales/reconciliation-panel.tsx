"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Check, AlertTriangle, CheckCircle } from "lucide-react"

interface ReconciliationPanelProps {
  onClose: () => void
}

export function ReconciliationPanel({ onClose }: ReconciliationPanelProps) {
  const { sales } = useStore()
  const [cashReceived, setCashReceived] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get today's sales
  const today = new Date()
  const todaySales = sales.filter((s) => {
    const saleDate = new Date(s.createdAt)
    return saleDate.toDateString() === today.toDateString()
  })

  // Calculate totals by payment method
  const cashSales = todaySales
    .filter((s) => s.paymentMethod === "cash" && s.status === "approved")
    .reduce((sum, s) => sum + s.totalAmount, 0)

  const transferSales = todaySales
    .filter((s) => s.paymentMethod === "transfer" && s.status === "approved")
    .reduce((sum, s) => sum + s.totalAmount, 0)

  const posSales = todaySales
    .filter((s) => s.paymentMethod === "pos" && s.status === "approved")
    .reduce((sum, s) => sum + s.totalAmount, 0)

  const totalExpected = cashSales + transferSales + posSales
  const cashReceivedNum = Number.parseFloat(cashReceived) || 0
  const difference = cashReceivedNum - cashSales
  const isBalanced = Math.abs(difference) < 1

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="space-y-6">
      {/* Date Header */}
      <div className="p-4 bg-muted/30 rounded-xl">
        <p className="text-sm text-muted-foreground">Reconciliation for</p>
        <p className="font-serif text-xl font-semibold">
          {today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Sales Summary */}
      <div>
        <h3 className="font-semibold mb-4">Sales Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Cash</Badge>
              <span className="text-sm text-muted-foreground">
                {todaySales.filter((s) => s.paymentMethod === "cash").length} sales
              </span>
            </div>
            <span className="font-serif font-semibold">₦{cashSales.toLocaleString("en-NG")}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Transfer</Badge>
              <span className="text-sm text-muted-foreground">
                {todaySales.filter((s) => s.paymentMethod === "transfer").length} sales
              </span>
            </div>
            <span className="font-serif font-semibold">₦{transferSales.toLocaleString("en-NG")}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant="outline">POS</Badge>
              <span className="text-sm text-muted-foreground">
                {todaySales.filter((s) => s.paymentMethod === "pos").length} sales
              </span>
            </div>
            <span className="font-serif font-semibold">₦{posSales.toLocaleString("en-NG")}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Expected vs Received */}
      <div className="p-4 bg-primary/5 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted-foreground">Total Expected (All Methods)</span>
          <span className="font-serif text-xl font-semibold">₦{totalExpected.toLocaleString("en-NG")}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Expected Cash</span>
          <span className="font-serif font-semibold">₦{cashSales.toLocaleString("en-NG")}</span>
        </div>
      </div>

      <Separator />

      {/* Cash Received Input */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cashReceived">Cash Received (₦)</Label>
          <Input
            id="cashReceived"
            type="number"
            placeholder="Enter actual cash received"
            value={cashReceived}
            onChange={(e) => setCashReceived(e.target.value)}
          />
        </div>

        {cashReceived && (
          <div
            className={`p-4 rounded-xl ${
              isBalanced ? "bg-success/10" : difference > 0 ? "bg-success/10" : "bg-destructive/10"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isBalanced ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <AlertTriangle className={`w-5 h-5 ${difference > 0 ? "text-success" : "text-destructive"}`} />
              )}
              <span className="font-medium">
                {isBalanced ? "Cash Balanced!" : difference > 0 ? "Over by" : "Short by"}
              </span>
            </div>
            {!isBalanced && (
              <p
                className={`font-serif text-2xl font-semibold ${difference > 0 ? "text-success" : "text-destructive"}`}
              >
                ₦{Math.abs(difference).toLocaleString("en-NG")}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Input
            id="notes"
            placeholder="Add any notes about today's reconciliation"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {/* Pending Sales Warning */}
      {todaySales.filter((s) => s.status === "pending").length > 0 && (
        <div className="p-4 bg-accent/30 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-accent-foreground shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-accent-foreground">Pending Sales</p>
            <p className="text-sm text-muted-foreground">
              You have {todaySales.filter((s) => s.status === "pending").length} pending sales that need to be reviewed
              before reconciliation is complete.
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={handleSubmit} disabled={isSubmitting || !cashReceived}>
          <Check className="w-4 h-4 mr-2" />
          {isSubmitting ? "Saving..." : "Complete Reconciliation"}
        </Button>
      </div>
    </div>
  )
}
