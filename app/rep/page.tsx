"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Package, Receipt, Clock, CheckCircle, XCircle, Plus, UserCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LiveSalesCounter } from "@/components/rep-dashboard/live-sales-counter"

export default function RepDashboardPage() {
  const { t } = useLanguage()
  const { sales, products, currentUser } = useStore()

  const mySales = currentUser ? sales.filter((s) => s.salesRepId === currentUser.id) : []

  const todaySales = mySales.filter((s) => {
    const today = new Date()
    const saleDate = new Date(s.createdAt)
    return saleDate.toDateString() === today.toDateString()
  })

  const todayTotal = todaySales.reduce((sum, s) => sum + s.totalAmount, 0)
  const pendingCount = todaySales.filter((s) => s.status === "pending").length
  const approvedCount = todaySales.filter((s) => s.status === "approved").length

  const lowStockProducts = products.filter((p) => p.quantity <= p.lowStockThreshold)

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
          <Badge className="bg-[#DFFF00] text-[#052B22] border-[#DFFF00] gap-1 text-xs">
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

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <UserCircle className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="font-serif text-xl font-semibold mb-2">No User Logged In</h2>
        <p className="text-muted-foreground mb-4">Please log in to access the sales rep dashboard.</p>
        <Link href="/login">
          <Button className="bg-[#052B22] hover:bg-[#0A4D40]">Go to Login</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6 pb-20 lg:pb-6">
      {/* Page Title */}
      <div>
        <h1 className="font-serif text-xl lg:text-2xl font-semibold">{t.dashboard}</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {currentUser.name}!</p>
      </div>

      <LiveSalesCounter totalSales={todayTotal} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
        <Link href="/rep/add-stock">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-card border border-border rounded-2xl p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow min-h-[120px] sm:min-h-[140px] flex flex-col justify-center"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold mb-1">{t.addStock || "Add Stock"}</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">Record new inventory arrivals</p>
          </motion.div>
        </Link>

        <Link href="/rep/record-sale">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#DFFF00] rounded-2xl p-4 sm:p-6 cursor-pointer hover:opacity-90 transition-opacity min-h-[120px] sm:min-h-[140px] flex flex-col justify-center"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#052B22]/10 flex items-center justify-center mb-3 sm:mb-4">
              <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-[#052B22]" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#052B22] mb-1">{t.recordSale}</h3>
            <p className="text-[#052B22]/70 text-xs sm:text-sm">Log a new sale transaction</p>
          </motion.div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-3 sm:p-4 border border-border"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#DFFF00]/20 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#052B22]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
              <p className="font-serif text-xl sm:text-2xl font-semibold">{pendingCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-3 sm:p-4 border border-border"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground">Approved</p>
              <p className="font-serif text-xl sm:text-2xl font-semibold">{approvedCount}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-serif text-base sm:text-lg">My Sales Log</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
            {todaySales.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Receipt className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No sales recorded today</p>
                <Link href="/rep/record-sale">
                  <Button variant="link" className="mt-2 text-sm">
                    Record your first sale
                  </Button>
                </Link>
              </div>
            ) : (
              todaySales.slice(0, 5).map((sale, index) => (
                <motion.div
                  key={sale.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-2 sm:p-3 bg-muted/30 rounded-lg gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{sale.items[0]?.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(sale.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-serif font-semibold text-sm">₦{sale.totalAmount.toLocaleString("en-NG")}</p>
                    {getStatusBadge(sale.status)}
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="font-serif text-base sm:text-lg flex items-center gap-2">
              {lowStockProducts.length > 0 && <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />}
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">All products are well stocked</p>
              </div>
            ) : (
              lowStockProducts.slice(0, 5).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-2 sm:p-3 bg-warning/20 rounded-lg border border-warning/30 gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-serif font-semibold text-sm text-[#052B22]">{product.quantity} left</p>
                    <p className="text-xs text-muted-foreground">Min: {product.lowStockThreshold}</p>
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Link href="/rep/record-sale" className="fixed bottom-6 right-6 lg:hidden z-40">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#DFFF00] rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus className="w-6 h-6 text-[#052B22]" />
        </motion.div>
      </Link>
    </div>
  )
}
