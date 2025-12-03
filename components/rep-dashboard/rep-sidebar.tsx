"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Package, Receipt, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

export function RepSidebar() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navItems = [
    { href: "/rep", icon: BarChart3, label: t.dashboard },
    { href: "/rep/add-stock", icon: Package, label: t.addStock || "Add Stock" },
    { href: "/rep/record-sale", icon: Receipt, label: t.recordSale },
  ]

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 h-16 border-b border-white/10">
        <div className="w-10 h-10 bg-[#DFFF00] rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-[#052B22]" />
        </div>
        <div>
          <span className="font-serif text-lg font-semibold text-white">{t.appName}</span>
          <p className="text-xs text-white/60">Sales Rep</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200",
                  isActive ? "bg-[#DFFF00] text-[#052B22]" : "hover:bg-white/10 text-white/70 hover:text-white",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Button variant="ghost" className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10">
          <LogOut className="w-5 h-5" />
          {t.logout}
        </Button>
      </div>
    </>
  )

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#052B22] text-white rounded-lg flex items-center justify-center shadow-lg"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#052B22] text-white flex-col z-40">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-64 bg-[#052B22] text-white flex flex-col z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
