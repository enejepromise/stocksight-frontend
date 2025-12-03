"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Store, Bell, Shield, Palette, Globe, Save, Building, Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageSelector } from "@/components/language-selector"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold">{t.settings}</h1>
          <p className="text-muted-foreground">{t.settingsDescription || "Manage your store preferences"}</p>
        </div>
        <Button onClick={handleSave} className="gap-2 bg-[#052B22] hover:bg-[#0A4D40]">
          <Save className="w-4 h-4" />
          {saved ? t.saved || "Saved!" : t.saveChanges || "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="store" className="gap-2">
            <Store className="w-4 h-4 hidden sm:block" />
            {t.store || "Store"}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4 hidden sm:block" />
            {t.notifications || "Notifications"}
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4 hidden sm:block" />
            {t.security || "Security"}
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4 hidden sm:block" />
            {t.appearance || "Appearance"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  {t.storeInfo || "Store Information"}
                </CardTitle>
                <CardDescription>{t.storeInfoDesc || "Basic information about your business"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">{t.storeName || "Store Name"}</Label>
                    <Input id="storeName" defaultValue="My Phone Shop" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">{t.currency || "Currency"}</Label>
                    <Select defaultValue="ngn">
                      <SelectTrigger id="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ngn">NGN (₦)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t.address || "Address"}
                  </Label>
                  <Input id="address" defaultValue="123 Market Street, Lagos" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {t.phone || "Phone"}
                    </Label>
                    <Input id="phone" defaultValue="+234 800 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {t.email || "Email"}
                    </Label>
                    <Input id="email" type="email" defaultValue="shop@example.com" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">{t.inventory || "Inventory Settings"}</CardTitle>
                <CardDescription>{t.inventorySettingsDesc || "Configure stock management preferences"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.lowStockAlerts || "Low Stock Alerts"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t.lowStockAlertsDesc || "Get notified when products are running low"}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.autoReorder || "Auto-Reorder Suggestions"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t.autoReorderDesc || "Suggest reorders based on sales patterns"}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">{t.notificationPrefs || "Notification Preferences"}</CardTitle>
                <CardDescription>{t.notificationPrefsDesc || "Choose what notifications you receive"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.saleNotifications || "Sale Notifications"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t.saleNotificationsDesc || "Get notified for every new sale"}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.pendingApprovals || "Pending Approval Alerts"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t.pendingApprovalsDesc || "Alert when sales need approval"}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.dailySummary || "Daily Summary"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t.dailySummaryDesc || "Receive end-of-day sales summary"}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.stockAlerts || "Stock Alerts"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t.stockAlertsDesc || "Low stock and out-of-stock warnings"}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">{t.passwordSecurity || "Password & Security"}</CardTitle>
                <CardDescription>{t.passwordSecurityDesc || "Manage your account security"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t.currentPassword || "Current Password"}</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t.newPassword || "New Password"}</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.confirmPassword || "Confirm Password"}</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button variant="outline">{t.updatePassword || "Update Password"}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">{t.twoFactor || "Two-Factor Authentication"}</CardTitle>
                <CardDescription>{t.twoFactorDesc || "Add an extra layer of security"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.enable2FA || "Enable 2FA"}</Label>
                    <p className="text-sm text-muted-foreground">{t.enable2FADesc || "Require code on login"}</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">{t.displaySettings || "Display Settings"}</CardTitle>
                <CardDescription>{t.displaySettingsDesc || "Customize how StockSight looks"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {t.language || "Language"}
                  </Label>
                  <div className="max-w-xs">
                    <LanguageSelector variant="full" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.darkMode || "Dark Mode"}</Label>
                    <p className="text-sm text-muted-foreground">{t.darkModeDesc || "Switch to dark theme"}</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.compactMode || "Compact Mode"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t.compactModeDesc || "Reduce spacing for more content"}
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
