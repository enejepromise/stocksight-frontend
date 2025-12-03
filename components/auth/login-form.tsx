"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

type AuthView = "welcome" | "login" | "signup"

interface LoginFormProps {
  onNavigate?: (view: AuthView) => void
}

export function LoginForm({ onNavigate }: LoginFormProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = t.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail
    }

    if (!formData.password) {
      newErrors.password = t.required
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Mock role-based redirect
    // In real app, check JWT role from backend
    router.push("/dashboard")
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      {onNavigate && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate("welcome")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </motion.button>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <h2 className="font-serif text-3xl font-semibold tracking-tight">{t.welcomeBack}</h2>
        <p className="text-muted-foreground">{t.loginSubtitle}</p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible" className="space-y-2">
          <Label htmlFor="email">{t.email}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@business.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={cn(
                "pl-11 h-12 bg-white border-border focus:border-electric-lemon focus:ring-2 focus:ring-electric-lemon/30",
                errors.email && "border-destructive",
              )}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>

        <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible" className="space-y-2">
          <Label htmlFor="password">{t.password}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={cn(
                "pl-11 pr-11 h-12 bg-white border-border focus:border-electric-lemon focus:ring-2 focus:ring-electric-lemon/30",
                errors.password && "border-destructive",
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.password}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          custom={2}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
            />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
              {t.rememberMe}
            </Label>
          </div>
          <button type="button" className="text-sm text-primary hover:underline underline-offset-4">
            {t.forgotPassword}
          </button>
        </motion.div>

        <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-electric-lemon hover:bg-electric-lemon/90 text-foreground font-medium group"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full"
              />
            ) : (
              <>
                {t.login}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </motion.div>
      </form>

      {/* Sign Up Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground"
      >
        {t.noAccount}{" "}
        <button
          onClick={() => onNavigate?.("signup")}
          className="text-primary font-medium hover:underline underline-offset-4"
        >
          {t.signUp}
        </button>
      </motion.p>
    </div>
  )
}
