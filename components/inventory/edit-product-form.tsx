"use client"

import type React from "react"

import { useState } from "react"
import { useStore, type Product } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditProductFormProps {
  product: Product
  onClose: () => void
}

export function EditProductForm({ product, onClose }: EditProductFormProps) {
  const { updateProduct } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    unit: product.unit,
    costPrice: product.costPrice.toString(),
    sellingPrice: product.sellingPrice.toString(),
    lowStockThreshold: product.lowStockThreshold.toString(),
    description: product.description || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    updateProduct(product.id, {
      name: formData.name,
      category: formData.category,
      unit: formData.unit,
      costPrice: Number.parseFloat(formData.costPrice),
      sellingPrice: Number.parseFloat(formData.sellingPrice),
      lowStockThreshold: Number.parseInt(formData.lowStockThreshold),
      description: formData.description || undefined,
    })
    setIsLoading(false)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Food">Food & Beverages</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Unit</Label>
        <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pieces">Pieces</SelectItem>
            <SelectItem value="cartons">Cartons</SelectItem>
            <SelectItem value="packs">Packs</SelectItem>
            <SelectItem value="kg">Kilograms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price (₦)</Label>
          <Input
            id="costPrice"
            type="number"
            min="0"
            step="0.01"
            value={formData.costPrice}
            onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price (₦)</Label>
          <Input
            id="sellingPrice"
            type="number"
            min="0"
            step="0.01"
            value={formData.sellingPrice}
            onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lowStockThreshold">Low Stock Alert Threshold</Label>
        <Input
          id="lowStockThreshold"
          type="number"
          min="0"
          value={formData.lowStockThreshold}
          onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
