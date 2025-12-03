"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Calendar,
  Download,
  DollarSign,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const COLORS = ["#052B22", "#DFFF00", "#0A4D40", "#B8CC00", "#1A6B5C"]

export default function ReportsPage() {
  const { t } = useLanguage()
  const { products, sales, salesReps } = useStore()
  const [dateRange, setDateRange] = useState("week")

  const dailySalesData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const today = new Date()
    const data = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dayName = days[date.getDay()]

      const daySales = sales.filter((s) => {
        const saleDate = new Date(s.createdAt)
        return saleDate.toDateString() === date.toDateString() && s.status !== "disputed"
      })

      const salesTotal = daySales.reduce((sum, s) => sum + s.totalAmount, 0)
      // Calculate profit based on actual cost vs selling price
      const profit = daySales.reduce((sum, s) => {
        return (
          sum +
          s.items.reduce((itemSum, item) => {
            const product = products.find((p) => p.id === item.productId)
            if (product) {
              return itemSum + (item.unitPrice - product.costPrice) * item.quantity
            }
            return itemSum
          }, 0)
        )
      }, 0)

      data.push({ name: dayName, sales: salesTotal, profit: Math.max(0, profit) })
    }

    return data
  }, [sales, products])

  const categoryData = useMemo(() => {
    if (products.length === 0) return []

    return products.reduce(
      (acc, product) => {
        const existing = acc.find((c) => c.name === product.category)
        if (existing) {
          existing.value += product.quantity * product.sellingPrice
        } else {
          acc.push({ name: product.category, value: product.quantity * product.sellingPrice })
        }
        return acc
      },
      [] as { name: string; value: number }[],
    )
  }, [products])

  const repPerformance = useMemo(() => {
    return salesReps.map((rep) => ({
      name: rep.name.split(" ")[0],
      sales: rep.totalSales,
      target: 300000,
    }))
  }, [salesReps])

  const totalSales = sales.filter((s) => s.status !== "disputed").reduce((sum, s) => sum + s.totalAmount, 0)
  const totalProfit = sales
    .filter((s) => s.status !== "disputed")
    .reduce((sum, s) => {
      return (
        sum +
        s.items.reduce((itemSum, item) => {
          const product = products.find((p) => p.id === item.productId)
          if (product) {
            return itemSum + (item.unitPrice - product.costPrice) * item.quantity
          }
          return itemSum
        }, 0)
      )
    }, 0)
  const avgOrderValue = sales.length > 0 ? totalSales / sales.length : 0

  // Calculate change percentages (comparing this week to last week)
  const thisWeekStart = new Date()
  thisWeekStart.setDate(thisWeekStart.getDate() - 7)
  const lastWeekStart = new Date()
  lastWeekStart.setDate(lastWeekStart.getDate() - 14)

  const thisWeekSales = sales
    .filter((s) => new Date(s.createdAt) >= thisWeekStart && s.status !== "disputed")
    .reduce((sum, s) => sum + s.totalAmount, 0)
  const lastWeekSales = sales
    .filter(
      (s) => new Date(s.createdAt) >= lastWeekStart && new Date(s.createdAt) < thisWeekStart && s.status !== "disputed",
    )
    .reduce((sum, s) => sum + s.totalAmount, 0)

  const salesChange = lastWeekSales > 0 ? (((thisWeekSales - lastWeekSales) / lastWeekSales) * 100).toFixed(1) : "0"

  const hasData = sales.length > 0 || products.length > 0 || salesReps.length > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold">{t.reports}</h1>
          <p className="text-muted-foreground">{t.reportsDescription || "Analyze your business performance"}</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            {t.export || "Export"}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.totalSales || "Total Sales"}</p>
                  <p className="font-serif text-2xl font-bold">₦{totalSales.toLocaleString()}</p>
                  <div
                    className={`flex items-center gap-1 mt-1 text-sm ${Number(salesChange) >= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {Number(salesChange) >= 0 ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{salesChange}%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.profit || "Profit"}</p>
                  <p className="font-serif text-2xl font-bold">₦{Math.max(0, totalProfit).toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <span>Based on cost prices</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.avgOrderValue || "Avg. Order"}</p>
                  <p className="font-serif text-2xl font-bold">₦{avgOrderValue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <span>{sales.length} orders</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.transactions || "Transactions"}</p>
                  <p className="font-serif text-2xl font-bold">{sales.length}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <span>{salesReps.filter((r) => r.isActive).length} active reps</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      {!hasData ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Start by adding products to your inventory and recording sales. Your reports and analytics will appear
              here once you have data.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sales">{t.salesTrend || "Sales Trend"}</TabsTrigger>
            <TabsTrigger value="categories">{t.categories || "Categories"}</TabsTrigger>
            <TabsTrigger value="staff">{t.staffPerformance || "Staff Performance"}</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">{t.salesAndProfit || "Sales & Profit"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {dailySalesData.every((d) => d.sales === 0) ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No sales data for this period</p>
                      </div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailySalesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₦${v / 1000}k`} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`₦${value.toLocaleString()}`, ""]}
                        />
                        <Bar dataKey="sales" fill="#052B22" radius={[4, 4, 0, 0]} name="Sales" />
                        <Bar dataKey="profit" fill="#DFFF00" radius={[4, 4, 0, 0]} name="Profit" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">{t.salesByCategory || "Inventory Value by Category"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  {categoryData.length === 0 ? (
                    <div className="text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No products in inventory</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`₦${value.toLocaleString()}`, ""]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">{t.staffSalesPerformance || "Staff Sales Performance"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {repPerformance.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No sales reps added yet</p>
                      </div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={repPerformance} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          type="number"
                          stroke="hsl(var(--muted-foreground))"
                          tickFormatter={(v) => `₦${v / 1000}k`}
                        />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" width={80} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`₦${value.toLocaleString()}`, ""]}
                        />
                        <Bar dataKey="sales" fill="#052B22" radius={[0, 4, 4, 0]} name="Sales" />
                        <Bar dataKey="target" fill="#DFFF00" radius={[0, 4, 4, 0]} name="Target" opacity={0.3} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
