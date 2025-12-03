"use client"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="lg:pl-[280px] transition-all duration-300">
        <DashboardHeader />
        <main className="p-4 lg:p-6 pt-20 lg:pt-6">{children}</main>
      </div>
    </div>
  )
}
