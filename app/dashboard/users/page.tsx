"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Plus, Search, MoreVertical, Edit, Trash2, Shield, Mail, Phone, Circle, Key } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useStore, type SalesRep } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { SlideOverPanel } from "@/components/dashboard/slide-over-panel"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function UsersPage() {
  const { t } = useLanguage()
  const { salesReps, addSalesRep, updateSalesRep, deleteSalesRep } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false)
  const [editingRep, setEditingRep] = useState<SalesRep | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pin: "",
    isActive: true,
  })

  const filteredReps = salesReps.filter(
    (rep) =>
      rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingRep) {
      updateSalesRep(editingRep.id, formData)
      setEditingRep(null)
    } else {
      addSalesRep(formData)
    }
    setIsAddPanelOpen(false)
    setFormData({ name: "", email: "", phone: "", pin: "", isActive: true })
  }

  const handleEdit = (rep: SalesRep) => {
    setFormData({
      name: rep.name,
      email: rep.email,
      phone: rep.phone,
      pin: rep.pin,
      isActive: rep.isActive,
    })
    setEditingRep(rep)
    setIsAddPanelOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteSalesRep(id)
    setDeleteConfirm(null)
  }

  const handleClosePanel = () => {
    setIsAddPanelOpen(false)
    setEditingRep(null)
    setFormData({ name: "", email: "", phone: "", pin: "", isActive: true })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold">{t.users}</h1>
          <p className="text-muted-foreground">{t.manageStaff || "Manage your sales representatives"}</p>
        </div>
        <Button onClick={() => setIsAddPanelOpen(true)} className="gap-2 bg-[#052B22] hover:bg-[#0A4D40]">
          <Plus className="w-4 h-4" />
          {t.addSalesRep || "Add Sales Rep"}
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={t.searchStaff || "Search staff..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredReps.map((rep, index) => (
            <motion.div
              key={rep.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
              style={{ boxShadow: "0 4px 20px rgba(5, 43, 34, 0.08)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-border">
                      <AvatarFallback className="bg-[#052B22] text-white font-medium">
                        {rep.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Circle
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 ${
                        rep.isActive ? "text-success fill-success" : "text-muted-foreground fill-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{rep.name}</h3>
                    <Badge variant={rep.isActive ? "default" : "secondary"} className="mt-1">
                      {rep.isActive ? t.active || "Active" : t.inactive || "Inactive"}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(rep)}>
                      <Edit className="w-4 h-4 mr-2" />
                      {t.edit || "Edit"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateSalesRep(rep.id, { isActive: !rep.isActive })}>
                      <Shield className="w-4 h-4 mr-2" />
                      {rep.isActive ? t.deactivate || "Deactivate" : t.activate || "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setDeleteConfirm(rep.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t.delete || "Delete"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{rep.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{rep.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">{t.todaySales || "Today"}</p>
                  <p className="font-serif font-semibold">₦{rep.todaySales.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t.totalSales || "Total"}</p>
                  <p className="font-serif font-semibold">₦{rep.totalSales.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredReps.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">{t.noStaffFound || "No staff members found"}</p>
        </div>
      )}

      {/* Add/Edit Panel */}
      <SlideOverPanel
        isOpen={isAddPanelOpen}
        onClose={handleClosePanel}
        title={editingRep ? t.editSalesRep || "Edit Sales Rep" : t.addSalesRep || "Add Sales Rep"}
        width="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t.fullName || "Full Name"}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.email || "Email"}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t.phone || "Phone"}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pin" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              {t.pinCode || "PIN Code"}
            </Label>
            <Input
              id="pin"
              type="password"
              maxLength={4}
              value={formData.pin}
              onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, "").slice(0, 4) })}
              placeholder="4-digit PIN"
              required
            />
            <p className="text-xs text-muted-foreground">
              {t.pinDescription || "Used for logging into the sales rep app"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="active">{t.activeStatus || "Active Status"}</Label>
            <Switch
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={handleClosePanel}>
              {t.cancel || "Cancel"}
            </Button>
            <Button type="submit" className="flex-1 bg-[#052B22] hover:bg-[#0A4D40]">
              {editingRep ? t.saveChanges || "Save Changes" : t.addSalesRep || "Add Sales Rep"}
            </Button>
          </div>
        </form>
      </SlideOverPanel>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.confirmDelete || "Confirm Delete"}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.deleteWarning ||
                "This action cannot be undone. This will permanently delete the sales rep and all their data."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel || "Cancel"}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="bg-destructive hover:bg-destructive/90"
            >
              {t.delete || "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
