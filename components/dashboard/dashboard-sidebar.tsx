"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Package,
  Receipt,
  FileText,
  Settings,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

const sidebarVariants = {
  expanded: { width: 280 },
  collapsed: { width: 80 },
}

const linkVariants = {
  expanded: { opacity: 1, x: 0 },
  collapsed: { opacity: 0, x: -10 },
}

export function DashboardSidebar() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", icon: BarChart3, label: t.dashboard },
    { href: "/dashboard/inventory", icon: Package, label: t.inventory },
    { href: "/dashboard/sales", icon: Receipt, label: t.sales },
    { href: "/dashboard/reports", icon: FileText, label: t.reports },
    { href: "/dashboard/users", icon: Users, label: t.users },
    { href: "/dashboard/settings", icon: Settings, label: t.settings },
  ]

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={() => mobile && setIsMobileOpen(false)}>
          <div className="w-10 h-10 bg-[#DFFF00] rounded-xl flex items-center justify-center shrink-0">
            <BarChart3 className="w-6 h-6 text-[#052B22]" />
          </div>
          <motion.span
            variants={!mobile ? linkVariants : undefined}
            className="font-serif text-xl font-semibold whitespace-nowrap"
          >
            {(!isCollapsed || mobile) && t.appName}
          </motion.span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} onClick={() => mobile && setIsMobileOpen(false)}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200",
                  isActive ? "bg-[#DFFF00] text-[#052B22]" : "hover:bg-white/10 text-white/70 hover:text-white",
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <motion.span variants={!mobile ? linkVariants : undefined} className="font-medium whitespace-nowrap">
                  {(!isCollapsed || mobile) && item.label}
                </motion.span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => {}}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <motion.span variants={!mobile ? linkVariants : undefined} className="whitespace-nowrap">
            {(!isCollapsed || mobile) && t.logout}
          </motion.span>
        </Button>

        {!mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        )}
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
      <motion.aside
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex fixed left-0 top-0 h-screen bg-[#052B22] text-white flex-col z-40"
      >
        <SidebarContent />
      </motion.aside>

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
              className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-[#052B22] text-white flex flex-col z-50"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
