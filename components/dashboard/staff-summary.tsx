"use client"

import { motion } from "framer-motion"
import { Users, Circle, UserPlus } from "lucide-react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { useLanguage } from "@/lib/language-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function StaffSummary() {
  const { t } = useLanguage()
  const { salesReps, sales } = useStore()

  // Calculate today's sales for each rep
  const today = new Date().toDateString()
  const repStats = salesReps.map((rep) => {
    const todaySales = sales
      .filter(
        (s) => s.salesRepId === rep.id && new Date(s.createdAt).toDateString() === today && s.status !== "disputed",
      )
      .reduce((sum, s) => sum + s.totalAmount, 0)
    return { ...rep, todaySales }
  })

  const activeReps = repStats.filter((r) => r.isActive)
  const topPerformer = [...activeReps].sort((a, b) => b.todaySales - a.todaySales)[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
      style={{ boxShadow: "0 4px 20px rgba(5, 43, 34, 0.08)" }}
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-serif text-lg font-semibold">{t.staffSummary || "Staff Summary"}</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {activeReps.length} {t.active || "active"}
        </span>
      </div>

      {repStats.length === 0 ? (
        <div className="p-6 text-center">
          <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-3">No sales reps added yet</p>
          <Link href="/dashboard/users">
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <UserPlus className="w-4 h-4" />
              Add Sales Rep
            </Button>
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {repStats.map((rep, index) => (
            <motion.div
              key={rep.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {rep.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Circle
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${
                      rep.isActive ? "text-success fill-success" : "text-muted-foreground fill-muted-foreground"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    {rep.name}
                    {topPerformer?.id === rep.id && rep.todaySales > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-accent text-accent-foreground rounded">
                        TOP
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {rep.isActive ? t.online || "Online" : t.offline || "Offline"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-serif font-semibold">₦{rep.todaySales.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{t.today || "Today"}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
