"use client"

import { useState } from "react"
import { Package, AlertTriangle, Receipt, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store"
import { StatCard } from "@/components/dashboard/stat-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { SlideOverPanel } from "@/components/dashboard/slide-over-panel"
import { AddProductForm } from "@/components/dashboard/add-product-form"
import { RecordSaleForm } from "@/components/dashboard/record-sale-form"
import { LiveActivityFeed } from "@/components/dashboard/live-activity-feed"
import { PendingApprovals } from "@/components/dashboard/pending-approvals"
import { LowStockCarousel } from "@/components/dashboard/low-stock-carousel"
import { StaffSummary } from "@/components/dashboard/staff-summary"

export default function DashboardPage() {
  const { t } = useLanguage()
  const { products, sales } = useStore()
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isRecordSaleOpen, setIsRecordSaleOpen] = useState(false)

  // Calculate real stats from store
  const totalProducts = products.length
  const lowStockCount = products.filter((p) => p.quantity <= p.lowStockThreshold).length
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todaySales = sales
    .filter((s) => new Date(s.createdAt) >= todayStart && s.status !== "disputed")
    .reduce((sum, s) => sum + s.totalAmount, 0)
  const totalRevenue = sales.filter((s) => s.status !== "disputed").reduce((sum, s) => sum + s.totalAmount, 0)

  const stats = [
    {
      title: t.totalProducts,
      value: totalProducts.toLocaleString(),
      change: `${products.filter((p) => p.quantity > p.lowStockThreshold).length} in stock`,
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: t.lowStock,
      value: lowStockCount.toString(),
      change: lowStockCount > 0 ? `${products.filter((p) => p.quantity === 0).length} out of stock` : "All healthy",
      changeType: lowStockCount > 0 ? ("negative" as const) : ("positive" as const),
      icon: AlertTriangle,
    },
    {
      title: t.todaySales,
      value: `₦${todaySales.toLocaleString()}`,
      change: `${sales.filter((s) => new Date(s.createdAt) >= todayStart).length} transactions`,
      changeType: "positive" as const,
      icon: Receipt,
      pulse: true,
    },
    {
      title: t.totalRevenue,
      value: `₦${totalRevenue >= 1000000 ? (totalRevenue / 1000000).toFixed(1) + "M" : totalRevenue.toLocaleString()}`,
      change: `${sales.filter((s) => s.status === "approved").length} approved`,
      changeType: "positive" as const,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="font-serif text-2xl font-semibold">{t.dashboard}</h1>
        <p className="text-muted-foreground">{t.welcomeBack || "Welcome back! Here's your business overview."}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid - 3 column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Pending Approvals & Quick Actions */}
        <div className="space-y-6">
          <PendingApprovals />
          <QuickActions onAddProduct={() => setIsAddProductOpen(true)} onRecordSale={() => setIsRecordSaleOpen(true)} />
        </div>

        {/* Middle Column - Live Activity Feed */}
        <div>
          <LiveActivityFeed />
        </div>

        {/* Right Column - Low Stock & Staff Summary */}
        <div className="space-y-6">
          <LowStockCarousel />
          <StaffSummary />
        </div>
      </div>

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
        isOpen={isRecordSaleOpen}
        onClose={() => setIsRecordSaleOpen(false)}
        title={t.recordSale}
        width="md"
      >
        <RecordSaleForm onClose={() => setIsRecordSaleOpen(false)} />
      </SlideOverPanel>
    </div>
  )
}
