"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Shield,
  Zap,
  Package,
  Receipt,
  Scale,
  Smartphone,
  Bell,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/language-context"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"

type AuthView = "welcome" | "login" | "signup"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
}

export default function WelcomePage() {
  const { t } = useLanguage()
  const [authView, setAuthView] = useState<AuthView>("welcome")
  const [direction, setDirection] = useState(0)

  const navigateToAuth = (view: AuthView) => {
    setDirection(view === "welcome" ? -1 : 1)
    setAuthView(view)
  }

  const problems = [
    {
      icon: Package,
      title: t.problems.inventory.title,
      description: t.problems.inventory.description,
    },
    {
      icon: Receipt,
      title: t.problems.money.title,
      description: t.problems.money.description,
    },
    {
      icon: Shield,
      title: t.problems.trust.title,
      description: t.problems.trust.description,
    },
  ]

  const features = [
    { icon: Zap, title: t.features.realTime, description: t.features.realTimeDesc },
    { icon: Shield, title: t.features.secure, description: t.features.secureDesc },
    { icon: BarChart3, title: t.features.insights, description: t.features.insightsDesc },
    { icon: Package, title: t.features.inventory, description: t.features.inventoryDesc },
    { icon: Receipt, title: t.features.sales, description: t.features.salesDesc },
    { icon: Scale, title: t.features.reconciliation, description: t.features.reconciliationDesc },
    { icon: Smartphone, title: t.features.multiDevice, description: t.features.multiDeviceDesc },
    { icon: Bell, title: t.features.alerts, description: t.features.alertsDesc },
  ]

  const steps = [
    { number: "01", ...t.steps.step1 },
    { number: "02", ...t.steps.step2 },
    { number: "03", ...t.steps.step3 },
    { number: "04", ...t.steps.step4 },
  ]

  const pricingTiers = [
    { ...t.tiers.starter, highlighted: false },
    { ...t.tiers.business, highlighted: true },
    { ...t.tiers.enterprise, highlighted: false },
  ]

  if (authView !== "welcome") {
    return (
      <div className="min-h-screen bg-deep-green flex items-center justify-center p-4">
        {/* Language selector in top right */}
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={authView}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md"
          >
            <div className="bg-card rounded-2xl p-8 shadow-2xl">
              {authView === "login" ? (
                <LoginForm onNavigate={navigateToAuth} />
              ) : (
                <RegisterForm onNavigate={navigateToAuth} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-green">
      <section className="relative min-h-screen flex flex-col">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-md"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-electric-lemon rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-foreground" />
                </div>
                <span className="font-serif text-xl font-semibold text-white">{t.appName}</span>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSelector />
                <Button
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/10"
                  onClick={() => navigateToAuth("login")}
                >
                  {t.login}
                </Button>
                <Button
                  className="bg-electric-lemon text-foreground hover:bg-electric-lemon/90"
                  onClick={() => navigateToAuth("signup")}
                >
                  {t.getStarted}
                </Button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <div className="flex-1 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-electric-lemon animate-pulse" />
                  {t.trustedBy}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance mb-6 text-white"
              >
                {t.heroTitle}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                {t.heroSubtitle}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gap-2 text-base h-12 px-8 bg-electric-lemon text-foreground hover:bg-electric-lemon/90"
                  onClick={() => navigateToAuth("signup")}
                >
                  {t.startFreeTrial}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base h-12 px-8 bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  {t.watchDemo}
                </Button>
              </motion.div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-16 lg:mt-24"
            >
              <div className="relative mx-auto max-w-5xl">
                <div className="rounded-2xl border border-white/10 bg-card shadow-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-electric-lemon" />
                    <div className="w-3 h-3 rounded-full bg-success" />
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: t.totalProducts, value: "1,234", change: "+12%" },
                        { label: t.lowStock, value: "23", change: "-5" },
                        { label: t.todaySales, value: "₦45,600", change: "+18%" },
                        { label: t.totalRevenue, value: "₦2.4M", change: "+24%" },
                      ].map((stat, i) => (
                        <div key={i} className="bg-background rounded-xl p-4 border border-border">
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="font-serif text-2xl font-semibold mt-1">{stat.value}</p>
                          <p className="text-xs text-electric-lemon mt-1 font-medium">{stat.change}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="bg-background rounded-xl p-4 border border-border h-40" />
                      <div className="bg-background rounded-xl p-4 border border-border h-40" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of page - Light background */}
      <div className="bg-background">
        {/* Problem Section */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4 text-balance">{t.problemTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.problemSubtitle}</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {problems.map((problem, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full bg-card border-border hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                        <problem.icon className="w-6 h-6 text-destructive" />
                      </div>
                      <CardTitle className="font-serif text-xl">{problem.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">{problem.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4 text-balance">{t.solutionTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.solutionSubtitle}</p>
            </motion.div>
          </div>
        </section>

        {/* Features Section - Deep green background */}
        <section className="py-20 lg:py-28 bg-deep-green text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4 text-balance">{t.featuresTitle}</h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-electric-lemon flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4 text-balance">{t.howItWorksTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.howItWorksSubtitle}</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {steps.map((step, index) => (
                <motion.div key={index} variants={itemVariants} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-electric-lemon flex items-center justify-center mb-4">
                      <span className="font-serif text-2xl font-semibold text-foreground">{step.number}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+3rem)] w-[calc(100%-3rem)]">
                      <ChevronRight className="w-6 h-6 text-border mx-auto" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4 text-balance">{t.pricingTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.pricingSubtitle}</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {pricingTiers.map((tier, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    className={`h-full relative ${
                      tier.highlighted
                        ? "border-electric-lemon border-2 shadow-xl shadow-electric-lemon/20 scale-105"
                        : "border-border"
                    }`}
                  >
                    {tier.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-electric-lemon text-foreground text-xs font-medium px-3 py-1 rounded-full">
                          {t.mostPopular}
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="font-serif text-xl">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      <div className="pt-4">
                        <span className="font-serif text-4xl font-semibold">{tier.price}</span>
                        {tier.price !== "Custom" && <span className="text-muted-foreground">{t.perMonth}</span>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-electric-lemon shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full ${tier.highlighted ? "bg-electric-lemon text-foreground hover:bg-electric-lemon/90" : ""}`}
                        variant={tier.highlighted ? "default" : "outline"}
                        onClick={() => navigateToAuth("signup")}
                      >
                        {t.getStartedWith}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-deep-green p-8 lg:p-16 text-center"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-electric-lemon/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-electric-lemon/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-4 text-balance">
                  {t.ctaTitle}
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
                <Button
                  size="lg"
                  className="gap-2 text-base h-12 px-8 bg-electric-lemon text-foreground hover:bg-electric-lemon/90"
                  onClick={() => navigateToAuth("signup")}
                >
                  {t.startFreeTrial}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-electric-lemon rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-foreground" />
                  </div>
                  <span className="font-serif text-xl font-semibold">{t.appName}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.subtitle}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">{t.product}</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {t.features.inventory}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {t.features.sales}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {t.features.insights}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">{t.company}</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {t.about}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {t.careers}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {t.blog}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">{t.support}</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {t.helpCenter}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {t.contact}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {t.privacy}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-12 pt-8 text-center">
              <p className="text-sm text-muted-foreground">{t.copyright}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
