"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, Search, Plus, UserCircle } from "lucide-react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RepAddStockPage() {
  const { products, addStock, currentUser } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProductId, setSelectedProductId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <UserCircle className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="font-serif text-xl font-semibold mb-2">No User Logged In</h2>
        <p className="text-muted-foreground mb-4">Please log in to add stock.</p>
        <Link href="/login">
          <Button className="bg-[#052B22] hover:bg-[#0A4D40]">Go to Login</Button>
        </Link>
      </div>
    )
  }

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const selectedProduct = products.find((p) => p.id === selectedProductId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProductId || !quantity) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    addStock(selectedProductId, Number.parseInt(quantity), note || undefined)
    setIsLoading(false)
    setSuccess(true)

    // Reset form
    setSelectedProductId("")
    setQuantity("")
    setNote("")

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Page Title */}
      <div>
        <h1 className="font-serif text-2xl font-semibold">Add Stock</h1>
        <p className="text-muted-foreground">Record new inventory arrivals</p>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-success/10 border border-success/20 rounded-xl text-success"
        >
          Stock added successfully!
        </motion.div>
      )}

      {products.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-lg font-semibold mb-2">No Products Available</h3>
            <p className="text-muted-foreground">
              There are no products in inventory yet. Ask your manager to add products first.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">Stock Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Search */}
              <div className="space-y-2">
                <Label>Search Product</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Product Select */}
              <div className="space-y-2">
                <Label>Select Product</Label>
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{product.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {product.quantity} in stock
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selected Product Info */}
              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-muted/30 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{selectedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedProduct.category} • {selectedProduct.unit}
                      </p>
                      <div className="mt-2 flex gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Current Stock</p>
                          <p className="font-serif font-semibold">
                            {selectedProduct.quantity} {selectedProduct.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Low Stock Alert</p>
                          <p className="font-serif font-semibold">
                            {selectedProduct.lowStockThreshold} {selectedProduct.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quantity */}
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

              {/* Preview */}
              {selectedProduct && quantity && Number.parseInt(quantity) > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-success/10 rounded-xl"
                >
                  <p className="text-sm text-muted-foreground">New stock level will be</p>
                  <p className="font-serif text-2xl font-semibold text-success">
                    {selectedProduct.quantity + Number.parseInt(quantity)} {selectedProduct.unit}
                  </p>
                </motion.div>
              )}

              {/* Note */}
              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Textarea
                  id="note"
                  placeholder="e.g., Received from supplier ABC"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full gap-2 bg-[#052B22] hover:bg-[#0A4D40]"
                disabled={isLoading || !selectedProductId || !quantity}
              >
                <Plus className="w-4 h-4" />
                {isLoading ? "Adding Stock..." : "Add Stock"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
