"use client"

import { RepSidebar } from "@/components/rep-dashboard/rep-sidebar"
import { RepHeader } from "@/components/rep-dashboard/rep-header"
import type { ReactNode } from "react"

export default function RepLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <RepSidebar />
      <div className="lg:pl-64">
        <RepHeader />
        <main className="p-4 lg:p-6 pt-16 lg:pt-6">{children}</main>
      </div>
    </div>
  )
}
