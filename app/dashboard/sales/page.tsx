"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Receipt, Plus, Search, Filter, Calendar, Check, X, Eye, Clock, CheckCircle, XCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlideOverPanel } from "@/components/dashboard/slide-over-panel"
import { RecordSaleForm } from "@/components/dashboard/record-sale-form"
import { SaleDetailsPanel } from "@/components/sales/sale-details-panel"
import { ReconciliationPanel } from "@/components/sales/reconciliation-panel"
import type { Sale } from "@/lib/store"

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.3 },
  }),
}

export default function SalesPage() {
  const { t } = useLanguage()
  const { sales, approveSale, disputeSale } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("today")

  // Panel states
  const [isRecordSaleOpen, setIsRecordSaleOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isReconciliationOpen, setIsReconciliationOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)

  // Filter sales
  const filteredSales = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    return sales.filter((sale) => {
      const saleDate = new Date(sale.createdAt)

      // Date filter
      let matchesDate = true
      if (dateFilter === "today") {
        matchesDate = saleDate >= today
      } else if (dateFilter === "week") {
        matchesDate = saleDate >= weekAgo
      } else if (dateFilter === "month") {
        matchesDate = saleDate >= monthAgo
      }

      // Status filter
      const matchesStatus = statusFilter === "all" || sale.status === statusFilter

      // Search
      const matchesSearch =
        sale.salesRepName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.items.some((item) => item.productName.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesDate && matchesStatus && matchesSearch
    })
  }, [sales, searchQuery, statusFilter, dateFilter])

  // Stats
  const todaySales = sales.filter((s) => {
    const today = new Date()
    const saleDate = new Date(s.createdAt)
    return saleDate.toDateString() === today.toDateString()
  })
  const todayTotal = todaySales.reduce((sum, s) => sum + s.totalAmount, 0)
  const pendingCount = sales.filter((s) => s.status === "pending").length
  const approvedToday = todaySales.filter((s) => s.status === "approved").length

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale)
    setIsDetailsOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1 text-xs">
            <CheckCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Approved</span>
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-[#DFFF00]/50 text-[#052B22] border-[#DFFF00] gap-1 text-xs">
            <Clock className="w-3 h-3" />
            <span className="hidden sm:inline">Pending</span>
          </Badge>
        )
      case "disputed":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1 text-xs">
            <XCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Disputed</span>
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-serif text-xl lg:text-2xl font-semibold">{t.sales}</h1>
          <p className="text-sm text-muted-foreground">Track and manage all sales transactions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" onClick={() => setIsReconciliationOpen(true)} className="w-full sm:w-auto">
            <Check className="w-4 h-4 mr-2" />
            Reconcile
          </Button>
          <Button
            onClick={() => setIsRecordSaleOpen(true)}
            className="gap-2 w-full sm:w-auto bg-[#052B22] hover:bg-[#0A4D40]"
          >
            <Plus className="w-4 h-4" />
            {t.recordSale}
          </Button>
        </div>
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
              <Receipt className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs lg:text-sm text-muted-foreground">{t.todaySales}</p>
              <p className="font-serif text-xl lg:text-2xl font-semibold truncate">
                ₦{todayTotal.toLocaleString("en-NG")}
              </p>
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
            <div className="w-10 h-10 rounded-lg bg-[#DFFF00]/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#052B22]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs lg:text-sm text-muted-foreground">Pending Review</p>
              <p className="font-serif text-xl lg:text-2xl font-semibold">{pendingCount}</p>
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
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xs lg:text-sm text-muted-foreground">Approved Today</p>
              <p className="font-serif text-xl lg:text-2xl font-semibold">{approvedToday}</p>
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
              placeholder="Search sales..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Sales Table */}
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
                <TableHead className="min-w-[80px]">ID</TableHead>
                <TableHead className="min-w-[120px]">Items</TableHead>
                <TableHead className="min-w-[100px]">Amount</TableHead>
                <TableHead className="hidden md:table-cell">Payment</TableHead>
                <TableHead className="hidden sm:table-cell">Rep</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredSales.map((sale, index) => (
                  <motion.tr
                    key={sale.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    variants={rowVariants}
                    className="border-b border-border last:border-0"
                  >
                    <TableCell className="font-mono text-xs">#{sale.id.slice(-6)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm truncate max-w-[120px]">{sale.items[0]?.productName}</p>
                        {sale.items.length > 1 && (
                          <p className="text-xs text-muted-foreground">+{sale.items.length - 1} more</p>
                        )}
                        <p className="text-xs text-muted-foreground sm:hidden">{sale.salesRepName}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-serif font-semibold text-sm">
                      ₦{sale.totalAmount.toLocaleString("en-NG")}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="capitalize text-xs">
                        {sale.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary" className="text-xs">
                        {sale.salesRepName}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewDetails(sale)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {sale.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-success hover:text-success"
                              onClick={() => approveSale(sale.id)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => disputeSale(sale.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {filteredSales.length === 0 && (
          <div className="p-8 lg:p-12 text-center">
            <Receipt className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No sales found</p>
          </div>
        )}
      </motion.div>

      {/* Slide-Over Panels */}
      <SlideOverPanel
        isOpen={isRecordSaleOpen}
        onClose={() => setIsRecordSaleOpen(false)}
        title={t.recordSale}
        width="md"
      >
        <RecordSaleForm onClose={() => setIsRecordSaleOpen(false)} />
      </SlideOverPanel>

      <SlideOverPanel
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false)
          setSelectedSale(null)
        }}
        title="Sale Details"
        width="md"
      >
        {selectedSale && (
          <SaleDetailsPanel
            sale={selectedSale}
            onClose={() => {
              setIsDetailsOpen(false)
              setSelectedSale(null)
            }}
          />
        )}
      </SlideOverPanel>

      <SlideOverPanel
        isOpen={isReconciliationOpen}
        onClose={() => setIsReconciliationOpen(false)}
        title="Daily Reconciliation"
        width="lg"
      >
        <ReconciliationPanel onClose={() => setIsReconciliationOpen(false)} />
      </SlideOverPanel>
    </div>
  )
}
