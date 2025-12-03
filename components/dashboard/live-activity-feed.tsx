"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Activity, Clock, DollarSign, Package, LogIn, CheckCircle } from "lucide-react"
import { useStore } from "@/lib/store"
import { useLanguage } from "@/lib/language-context"
import { formatDistanceToNow } from "date-fns"

const activityIcons = {
  sale: DollarSign,
  stock: Package,
  login: LogIn,
  approval: CheckCircle,
}

const activityColors = {
  sale: "bg-accent text-accent-foreground",
  stock: "bg-primary/20 text-primary",
  login: "bg-muted text-muted-foreground",
  approval: "bg-success/20 text-success",
}

export function LiveActivityFeed() {
  const { t } = useLanguage()
  const { activities } = useStore()
  const recentActivities = activities.slice(0, 8)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
      style={{ boxShadow: "0 4px 20px rgba(5, 43, 34, 0.08)" }}
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent" />
          <h3 className="font-serif text-lg font-semibold">{t.liveActivity || "Live Activity"}</h3>
        </div>
        {recentActivities.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        )}
      </div>

      {recentActivities.length === 0 ? (
        <div className="p-8 text-center">
          <Activity className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No activity yet</p>
          <p className="text-xs text-muted-foreground mt-1">Activities will appear here as they happen</p>
        </div>
      ) : (
        <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {recentActivities.map((activity, index) => {
              const Icon = activityIcons[activity.type]
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activityColors[activity.type]}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.userName}</span>{" "}
                        <span className="text-muted-foreground">{activity.message}</span>
                        {activity.amount && (
                          <span className="font-serif font-semibold text-accent ml-1">
                            ₦{activity.amount.toLocaleString()}
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
