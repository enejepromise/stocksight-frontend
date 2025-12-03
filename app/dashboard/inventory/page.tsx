"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash2,
  PackagePlus,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlideOverPanel } from "@/components/dashboard/slide-over-panel"
import { AddProductForm } from "@/components/dashboard/add-product-form"
import { AddStockForm } from "@/components/inventory/add-stock-form"
import { EditProductForm } from "@/components/inventory/edit-product-form"
import { StockHistoryPanel } from "@/components/inventory/stock-history-panel"
import type { Product } from "@/lib/store"

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.3 },
  }),
}

export default function InventoryPage() {
  const { t } = useLanguage()
  const { products, deleteProduct } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Panel states
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category))
    return Array.from(cats)
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && product.quantity <= product.lowStockThreshold) ||
        (stockFilter === "out" && product.quantity === 0) ||
        (stockFilter === "in" && product.quantity > product.lowStockThreshold)
      return matchesSearch && matchesCategory && matchesStock
    })

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "quantity":
          comparison = a.quantity - b.quantity
          break
        case "price":
          comparison = a.sellingPrice - b.sellingPrice
          break
        case "updated":
          comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [products, searchQuery, categoryFilter, stockFilter, sortBy, sortOrder])

  const lowStockCount = products.filter((p) => p.quantity <= p.lowStockThreshold).length
  const totalValue = products.reduce((sum, p) => sum + p.quantity * p.sellingPrice, 0)

  const handleAddStock = (product: Product) => {
    setSelectedProduct(product)
    setIsAddStockOpen(true)
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsEditProductOpen(true)
  }

  const handleViewHistory = (product: Product) => {
    setSelectedProduct(product)
    setIsHistoryOpen(true)
  }

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-serif text-xl lg:text-2xl font-semibold">{t.inventory}</h1>
          <p className="text-sm text-muted-foreground">Manage your products and stock levels</p>
        </div>
        <Button
          onClick={() => setIsAddProductOpen(true)}
          className="gap-2 w-full sm:w-auto bg-[#052B22] hover:bg-[#0A4D40]"
        >
          <Plus className="w-4 h-4" />
          {t.addProduct}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-4 border border-border"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs lg:text-sm text-muted-foreground">Total Products</p>
              <p className="font-serif text-xl lg:text-2xl font-semibold">{products.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-4 border border-border"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div className="min-w-0">
              <p className="text-xs lg:text-sm text-muted-foreground">{t.lowStock}</p>
              <p className="font-serif text-xl lg:text-2xl font-semibold">{lowStockCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-4 border border-border"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xs lg:text-sm text-muted-foreground">Total Stock Value</p>
              <p className="font-serif text-xl lg:text-2xl font-semibold truncate">
                ₦{totalValue.toLocaleString("en-NG")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl p-4 border border-border"
      >
        <div className="flex flex-col gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in">In Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
        style={{ boxShadow: "0 4px 20px rgba(5, 43, 34, 0.08)" }}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3" onClick={() => toggleSort("name")}>
                    Product
                    <ArrowUpDown className="w-3 h-3" />
                  </Button>
                </TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3" onClick={() => toggleSort("quantity")}>
                    Qty
                    <ArrowUpDown className="w-3 h-3" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">Cost</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3" onClick={() => toggleSort("price")}>
                    Price
                    <ArrowUpDown className="w-3 h-3" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredProducts.map((product, index) => {
                  const isLowStock = product.quantity <= product.lowStockThreshold
                  const isOutOfStock = product.quantity === 0
                  return (
                    <motion.tr
                      key={product.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -20 }}
                      variants={rowVariants}
                      className="border-b border-border last:border-0"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground sm:hidden">{product.category}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-serif font-semibold text-sm">{product.quantity}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-serif text-sm">
                        ₦{product.costPrice.toLocaleString("en-NG")}
                      </TableCell>
                      <TableCell className="font-serif font-semibold text-sm">
                        ₦{product.sellingPrice.toLocaleString("en-NG")}
                      </TableCell>
                      <TableCell>
                        {isOutOfStock ? (
                          <Badge variant="destructive" className="text-xs">
                            Out
                          </Badge>
                        ) : isLowStock ? (
                          <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                            Low
                          </Badge>
                        ) : (
                          <Badge className="bg-success/10 text-success border-success/20 text-xs">OK</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAddStock(product)}>
                              <PackagePlus className="w-4 h-4 mr-2" />
                              Add Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(product)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewHistory(product)}>
                              <Package className="w-4 h-4 mr-2" />
                              History
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => deleteProduct(product.id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-8 lg:p-12 text-center">
            <Package className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </motion.div>

      {/* Slide-Over Panels */}
      <SlideOverPanel
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        title={t.addProduct}
        width="md"
      >
        <AddProductForm onClose={() => setIsAddProductOpen(false)} />
      </SlideOverPanel>

      <SlideOverPanel
        isOpen={isAddStockOpen}
        onClose={() => {
          setIsAddStockOpen(false)
          setSelectedProduct(null)
        }}
        title="Add Stock"
        width="sm"
      >
        {selectedProduct && (
          <AddStockForm
            product={selectedProduct}
            onClose={() => {
              setIsAddStockOpen(false)
              setSelectedProduct(null)
            }}
          />
        )}
      </SlideOverPanel>

      <SlideOverPanel
        isOpen={isEditProductOpen}
        onClose={() => {
          setIsEditProductOpen(false)
          setSelectedProduct(null)
        }}
        title="Edit Product"
        width="md"
      >
        {selectedProduct && (
          <EditProductForm
            product={selectedProduct}
            onClose={() => {
              setIsEditProductOpen(false)
              setSelectedProduct(null)
            }}
          />
        )}
      </SlideOverPanel>

      <SlideOverPanel
        isOpen={isHistoryOpen}
        onClose={() => {
          setIsHistoryOpen(false)
          setSelectedProduct(null)
        }}
        title="Stock History"
        width="lg"
      >
        {selectedProduct && <StockHistoryPanel product={selectedProduct} />}
      </SlideOverPanel>
    </div>
  )
}
