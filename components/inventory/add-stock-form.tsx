"use client"

import type React from "react"

import { useState } from "react"
import { useStore, type Product } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AddStockFormProps {
  product: Product
  onClose: () => void
}

export function AddStockForm({ product, onClose }: AddStockFormProps) {
  const { addStock } = useStore()
  const [quantity, setQuantity] = useState("")
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quantity || Number.parseInt(quantity) <= 0) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    addStock(product.id, Number.parseInt(quantity), note || undefined)
    setIsLoading(false)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-muted/30 rounded-xl">
        <p className="text-sm text-muted-foreground">Adding stock to</p>
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Current stock:{" "}
          <span className="font-serif font-semibold text-foreground">
            {product.quantity} {product.unit}
          </span>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity to Add</Label>
        <Input
          id="quantity"
          type="number"
          placeholder="Enter quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Textarea
          id="note"
          placeholder="e.g., New shipment from supplier"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
      </div>

      {quantity && Number.parseInt(quantity) > 0 && (
        <div className="p-4 bg-success/10 rounded-xl">
          <p className="text-sm text-muted-foreground">New stock level will be</p>
          <p className="font-serif text-2xl font-semibold text-success">
            {product.quantity + Number.parseInt(quantity)} {product.unit}
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading || !quantity}>
          {isLoading ? "Adding..." : "Add Stock"}
        </Button>
      </div>
    </form>
  )
}
