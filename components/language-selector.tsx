"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronDown, Globe } from "lucide-react"
import { useLanguage, type Language } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ha", name: "Hausa", nativeName: "Hausa" },
  { code: "yo", name: "Yoruba", nativeName: "Yorùbá" },
  { code: "ig", name: "Igbo", nativeName: "Igbo" },
]

interface LanguageSelectorProps {
  variant?: "default" | "minimal" | "full"
  className?: string
}

export function LanguageSelector({ variant = "default", className }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages.find((l) => l.code === language)

  if (variant === "full") {
    return (
      <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
        <SelectTrigger className={cn("w-full", className)}>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center justify-between w-full">
                <span>{lang.nativeName}</span>
                <span className="text-xs text-muted-foreground ml-2">({lang.name})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-lg transition-colors",
          variant === "default"
            ? "px-3 py-2 sm:px-4 sm:py-2.5 bg-white/10 border border-white/20 hover:border-white/30 text-white"
            : "px-3 py-2 hover:bg-secondary/50",
        )}
      >
        <Globe className="w-4 h-4" />
        <span className={cn("text-sm font-medium", variant === "minimal" && "hidden sm:inline")}>
          {currentLang?.nativeName}
        </span>
        <ChevronDown className={cn("w-4 h-4 transition-transform hidden sm:block", isOpen && "rotate-180")} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
            >
              <div className="p-1">
                {languages.map((lang, index) => (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setLanguage(lang.code)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors",
                      language === lang.code ? "bg-[#DFFF00] text-[#052B22]" : "hover:bg-secondary",
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium">{lang.nativeName}</p>
                      <p
                        className={cn(
                          "text-xs",
                          language === lang.code ? "text-[#052B22]/70" : "text-muted-foreground",
                        )}
                      >
                        {lang.name}
                      </p>
                    </div>
                    {language === lang.code && <Check className="w-4 h-4" />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
