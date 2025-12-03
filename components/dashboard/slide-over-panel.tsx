"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface SlideOverPanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  width?: "sm" | "md" | "lg"
}

const widthClasses = {
  sm: "w-full sm:max-w-sm",
  md: "w-full sm:max-w-md",
  lg: "w-full sm:max-w-lg",
}

export function SlideOverPanel({ isOpen, onClose, title, children, width = "md" }: SlideOverPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed right-0 top-0 h-screen bg-card border-l border-border shadow-2xl z-50 ${widthClasses[width]}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <h2 className="font-serif text-lg sm:text-xl font-semibold">{title}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto h-[calc(100vh-65px)] sm:h-[calc(100vh-73px)]">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
