"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Receipt, Plus, Trash2, Search, UserCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SaleSuccessFlash } from "@/components/rep-dashboard/sale-success-flash"

interface SaleItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
  maxQuantity: number
}

export default function RepRecordSalePage() {
  const { t } = useLanguage()
  const { products, recordSale, currentUser } = useStore()
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<SaleItem[]>([
    { id: "1", productId: "", productName: "", quantity: 1, price: 0, maxQuantity: 0 },
  ])

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <UserCircle className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="font-serif text-xl font-semibold mb-2">No User Logged In</h2>
        <p className="text-muted-foreground mb-4">Please log in to record sales.</p>
        <Link href="/login">
          <Button className="bg-[#052B22] hover:bg-[#0A4D40]">Go to Login</Button>
        </Link>
      </div>
    )
  }

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), productId: "", productName: "", quantity: 1, price: 0, maxQuantity: 0 },
    ])
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
          item.id === id
            ? {
                ...item,
                productId,
                productName: product.name,
                price: product.sellingPrice,
                maxQuantity: product.quantity,
              }
            : item,
        ),
      )
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    const item = items.find((i) => i.id === id)
    if (item && quantity <= item.maxQuantity && quantity >= 1) {
      setItems(items.map((i) => (i.id === id ? { ...i, quantity } : i)))
    }
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentMethod || items.some((i) => !i.productId)) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

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
      salesRepId: currentUser.id,
      salesRepName: currentUser.name,
      status: "pending",
    })

    setIsLoading(false)

    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 600)

    // Reset form
    setPaymentMethod("")
    setItems([{ id: "1", productId: "", productName: "", quantity: 1, price: 0, maxQuantity: 0 }])
  }

  // Get available products (not already selected)
  const getAvailableProducts = (currentItemId: string) => {
    const selectedIds = items.filter((i) => i.id !== currentItemId).map((i) => i.productId)
    return products
      .filter((p) => !selectedIds.includes(p.id) && p.quantity > 0)
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  return (
    <>
      <SaleSuccessFlash show={showFlash} />

      <div className="space-y-6 max-w-2xl mx-auto pb-24">
        {/* Page Title */}
        <div>
          <h1 className="font-serif text-2xl font-semibold">{t.recordSale}</h1>
          <p className="text-muted-foreground">Log a new sale transaction</p>
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold mb-2">No Products Available</h3>
              <p className="text-muted-foreground">
                There are no products in inventory yet. Ask your manager to add products first.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Sale Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 h-12 bg-white"
                  />
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-muted/30 rounded-xl space-y-4"
                    >
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
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableProducts(item.id).map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                <div className="flex items-center gap-2">
                                  <span>{product.name}</span>
                                  <span className="text-muted-foreground">
                                    ₦{product.sellingPrice.toLocaleString("en-NG")}
                                  </span>
                                  <Badge variant="secondary" className="ml-auto">
                                    {product.quantity} available
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {item.productId && (
                        <>
                          <div className="space-y-2">
                            <Label>Quantity</Label>
                            <div className="flex items-center gap-3">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-12 w-12 text-xl bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                max={item.maxQuantity}
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                className="h-12 text-center text-xl font-semibold w-20"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-12 w-12 text-xl bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.maxQuantity}
                              >
                                +
                              </Button>
                              <span className="text-sm text-muted-foreground">Max: {item.maxQuantity}</span>
                            </div>
                          </div>

                          <div className="text-right pt-2 border-t border-border">
                            <span className="text-sm text-muted-foreground">Subtotal: </span>
                            <span className="font-serif font-semibold">
                              ₦{(item.quantity * item.price).toLocaleString("en-NG")}
                            </span>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>

                <Button type="button" variant="outline" className="w-full gap-2 bg-transparent h-12" onClick={addItem}>
                  <Plus className="w-4 h-4" />
                  Add Another Item
                </Button>

                {/* Total */}
                <div className="p-4 bg-deep-green rounded-xl text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Amount</span>
                    <span className="font-serif text-3xl font-bold text-electric-lemon">
                      ₦{total.toLocaleString("en-NG")}
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["cash", "transfer", "pos", "credit"].map((method) => (
                      <Button
                        key={method}
                        type="button"
                        variant={paymentMethod === method ? "default" : "outline"}
                        className={`h-12 capitalize ${
                          paymentMethod === method
                            ? "bg-electric-lemon text-foreground hover:bg-electric-lemon/90"
                            : "bg-transparent"
                        }`}
                        onClick={() => setPaymentMethod(method)}
                      >
                        {method === "pos" ? "POS" : method}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    Sales will be submitted for owner approval. Stock will be automatically reduced once the sale is
                    recorded.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2 h-14 text-lg bg-electric-lemon text-foreground hover:bg-electric-lemon/90"
                  disabled={isLoading || !paymentMethod || items.some((i) => !i.productId)}
                >
                  <Receipt className="w-5 h-5" />
                  {isLoading ? "Recording Sale..." : "Record Sale"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
