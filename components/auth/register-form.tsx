"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Building2, Phone, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

type AuthView = "welcome" | "login" | "signup"

interface RegisterFormProps {
  onNavigate?: (view: AuthView) => void
}

export function RegisterForm({ onNavigate }: RegisterFormProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    shopName: "", // Changed from businessName to shopName
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName) newErrors.fullName = t.required
    if (!formData.shopName) newErrors.shopName = t.required

    if (!formData.email) {
      newErrors.email = t.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail
    }

    if (!formData.password) {
      newErrors.password = t.required
    } else if (formData.password.length < 8) {
      newErrors.password = t.passwordMin
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.required
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMatch
    }

    if (!formData.agreeTerms) newErrors.agreeTerms = t.required

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Owner signup always goes to owner dashboard
    router.push("/dashboard")
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4 },
    }),
  }

  return (
    <div className="space-y-6">
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
        <h2 className="font-serif text-3xl font-semibold tracking-tight">{t.createAccount}</h2>
        <p className="text-muted-foreground">{t.registerSubtitle}</p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible" className="space-y-2">
            <Label htmlFor="fullName">{t.fullName}</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={cn(
                  "pl-11 h-11 bg-white border-border focus:border-electric-lemon focus:ring-2 focus:ring-electric-lemon/30",
                  errors.fullName && "border-destructive",
                )}
              />
            </div>
            {errors.fullName && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive">
                {errors.fullName}
              </motion.p>
            )}
          </motion.div>

          <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible" className="space-y-2">
            <Label htmlFor="shopName">{t.businessName}</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="shopName"
                type="text"
                value={formData.shopName}
                onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                className={cn(
                  "pl-11 h-11 bg-white border-border focus:border-electric-lemon focus:ring-2 focus:ring-electric-lemon/30",
                  errors.shopName && "border-destructive",
                )}
              />
            </div>
            {errors.shopName && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive">
                {errors.shopName}
              </motion.p>
            )}
          </motion.div>
        </div>

        <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible" className="space-y-2">
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
                "pl-11 h-11 bg-white border-border focus:border-electric-lemon focus:ring-2 focus:ring-electric-lemon/30",
                errors.email && "border-destructive",
              )}
            />
          </div>
          {errors.email && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive">
              {errors.email}
            </motion.p>
          )}
        </motion.div>

        <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible" className="space-y-2">
          <Label htmlFor="phone">{t.phoneNumber}</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+234"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="pl-11 h-11 bg-white border-border focus:border-electric-lemon focus:ring-2 focus:ring-electric-lemon/30"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div custom={4} variants={inputVariants} initial="hidden" animate="visible" className="space-y-2">
            <Label htmlFor="password">{t.password}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={cn(
                  "pl-11 pr-11 h-11 bg-white border-border focus:border-electric-lemon focus:ring-2 focus:ring-electric-lemon/30",
                  errors.password && "border-destructive",
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive">
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          <motion.div custom={5} variants={inputVariants} initial="hidden" animate="visible" className="space-y-2">
            <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={cn(
                  "pl-11 pr-11 h-11 bg-white border-border focus:border-electric-lemon focus:ring-2 focus:ring-electric-lemon/30",
                  errors.confirmPassword && "border-destructive",
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive">
                {errors.confirmPassword}
              </motion.p>
            )}
          </motion.div>
        </div>

        <motion.div
          custom={6}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-2"
        >
          <Checkbox
            id="terms"
            checked={formData.agreeTerms}
            onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
            className="mt-0.5"
          />
          <Label
            htmlFor="terms"
            className={cn(
              "text-sm font-normal cursor-pointer leading-relaxed",
              errors.agreeTerms && "text-destructive",
            )}
          >
            {t.agreeTerms}
          </Label>
        </motion.div>

        <motion.div custom={7} variants={inputVariants} initial="hidden" animate="visible">
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
                {t.register}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </motion.div>
      </form>

      {/* Sign In Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-muted-foreground"
      >
        {t.hasAccount}{" "}
        <button
          onClick={() => onNavigate?.("login")}
          className="text-primary font-medium hover:underline underline-offset-4"
        >
          {t.signIn}
        </button>
      </motion.p>
    </div>
  )
}
