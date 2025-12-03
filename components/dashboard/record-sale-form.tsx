"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Receipt } from "lucide-react"

interface SaleItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
}

interface RecordSaleFormProps {
  onClose: () => void
}

export function RecordSaleForm({ onClose }: RecordSaleFormProps) {
  const { t } = useLanguage()
  const { products, recordSale, salesReps } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [selectedRepId, setSelectedRepId] = useState("")
  const [items, setItems] = useState<SaleItem[]>([{ id: "1", productId: "", productName: "", quantity: 1, price: 0 }])

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), productId: "", productName: "", quantity: 1, price: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, productId, productName: product.name, price: product.sellingPrice } : item,
        ),
      )
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentMethod || items.some((i) => !i.productId)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const selectedRep = salesReps.find((r) => r.id === selectedRepId)

    recordSale({
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.quantity * item.price,
      })),
      totalAmount: total,
      paymentMethod,
      salesRepId: selectedRep?.id || "owner",
      salesRepName: selectedRep?.name || "Owner",
      status: "approved", // Owner-recorded sales are auto-approved
    })

    setIsLoading(false)
    onClose()
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-serif text-lg font-semibold mb-2">No Products Available</h3>
        <p className="text-muted-foreground mb-4">Add products to your inventory first before recording sales.</p>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Sales Rep (Optional)</Label>
        <Select value={selectedRepId} onValueChange={setSelectedRepId}>
          <SelectTrigger>
            <SelectValue placeholder="Select sales rep or leave empty for self" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owner">Owner (Self)</SelectItem>
            {salesReps
              .filter((r) => r.isActive)
              .map((rep) => (
                <SelectItem key={rep.id} value={rep.id}>
                  {rep.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="p-4 bg-muted/30 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Item {index + 1}</span>
              {items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>Product</Label>
              <Select value={item.productId} onValueChange={(value) => updateItem(item.id, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products
                    .filter((p) => p.quantity > 0)
                    .map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ₦{product.sellingPrice.toLocaleString("en-NG")}
                        <span className="text-muted-foreground ml-2">({product.quantity} in stock)</span>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label>Unit Price (₦)</Label>
                <Input type="number" value={item.price} readOnly className="bg-muted" />
              </div>
            </div>

            {item.productId && (
              <div className="text-right text-sm">
                Subtotal:{" "}
                <span className="font-serif font-semibold">
                  ₦{(item.quantity * item.price).toLocaleString("en-NG")}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" className="w-full gap-2 bg-transparent" onClick={addItem}>
        <Plus className="w-4 h-4" />
        Add Another Item
      </Button>

      <div className="p-4 bg-primary/5 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="font-medium">Total Amount</span>
          <span className="font-serif text-2xl font-semibold">₦{total.toLocaleString("en-NG")}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="transfer">Bank Transfer</SelectItem>
            <SelectItem value="pos">POS</SelectItem>
            <SelectItem value="credit">Credit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-[#052B22] hover:bg-[#0A4D40]"
          disabled={isLoading || !paymentMethod || items.some((i) => !i.productId)}
        >
          {isLoading ? "Recording..." : t.recordSale}
        </Button>
      </div>
    </form>
  )
}
