"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  costPrice: number
  sellingPrice: number
  lowStockThreshold: number
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Sale {
  id: string
  items: {
    productId: string
    productName: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  totalAmount: number
  paymentMethod: string
  salesRepId: string
  salesRepName: string
  status: "pending" | "approved" | "disputed"
  createdAt: string
}

export interface StockLog {
  id: string
  productId: string
  productName: string
  type: "add" | "sale" | "adjustment"
  quantity: number
  previousQuantity: number
  newQuantity: number
  note?: string
  userId: string
  userName: string
  createdAt: string
}

export interface SalesRep {
  id: string
  name: string
  email: string
  phone: string
  pin: string
  isActive: boolean
  todaySales: number
  totalSales: number
  createdAt: string
}

export interface Activity {
  id: string
  type: "sale" | "stock" | "login" | "approval"
  message: string
  userId: string
  userName: string
  amount?: number
  createdAt: string
}

interface StoreState {
  products: Product[]
  sales: Sale[]
  stockLogs: StockLog[]
  salesReps: SalesRep[]
  activities: Activity[]
  currentUser: SalesRep | null
  setCurrentUser: (rep: SalesRep | null) => void
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  addStock: (productId: string, quantity: number, note?: string) => void
  recordSale: (sale: Omit<Sale, "id" | "createdAt">) => void
  approveSale: (saleId: string) => void
  disputeSale: (saleId: string) => void
  addActivity: (activity: Omit<Activity, "id" | "createdAt">) => void
  addSalesRep: (rep: Omit<SalesRep, "id" | "createdAt" | "todaySales" | "totalSales">) => void
  updateSalesRep: (id: string, updates: Partial<SalesRep>) => void
  deleteSalesRep: (id: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      sales: [],
      stockLogs: [],
      salesReps: [],
      activities: [],
      currentUser: null,

      setCurrentUser: (rep) => {
        set({ currentUser: rep })
        if (rep) {
          // Log login activity
          const newActivity: Activity = {
            id: Date.now().toString(),
            type: "login",
            message: "logged in",
            userId: rep.id,
            userName: rep.name,
            createdAt: new Date().toISOString(),
          }
          set((state) => ({ activities: [newActivity, ...state.activities] }))
        }
      },

      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ products: [...state.products, newProduct] }))

        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "stock",
          message: `added new product: ${product.name}`,
          userId: "owner",
          userName: "Owner",
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ activities: [newActivity, ...state.activities] }))
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p,
          ),
        }))
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
      },

      addStock: (productId, quantity, note) => {
        const product = get().products.find((p) => p.id === productId)
        if (!product) return

        const currentUser = get().currentUser
        const log: StockLog = {
          id: Date.now().toString(),
          productId,
          productName: product.name,
          type: "add",
          quantity,
          previousQuantity: product.quantity,
          newQuantity: product.quantity + quantity,
          note,
          userId: currentUser?.id || "owner",
          userName: currentUser?.name || "Owner",
          createdAt: new Date().toISOString(),
        }

        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "stock",
          message: `added ${quantity} units to ${product.name}`,
          userId: currentUser?.id || "owner",
          userName: currentUser?.name || "Owner",
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity + quantity, updatedAt: new Date().toISOString() } : p,
          ),
          stockLogs: [log, ...state.stockLogs],
          activities: [newActivity, ...state.activities],
        }))
      },

      recordSale: (sale) => {
        const newSale: Sale = {
          ...sale,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }

        // Reduce stock for each item
        const products = get().products.map((product) => {
          const saleItem = sale.items.find((item) => item.productId === product.id)
          if (saleItem) {
            return {
              ...product,
              quantity: product.quantity - saleItem.quantity,
              updatedAt: new Date().toISOString(),
            }
          }
          return product
        })

        // Create stock logs for sales
        const newLogs: StockLog[] = sale.items.map((item) => {
          const product = get().products.find((p) => p.id === item.productId)!
          return {
            id: `${Date.now()}-${item.productId}`,
            productId: item.productId,
            productName: item.productName,
            type: "sale" as const,
            quantity: item.quantity,
            previousQuantity: product.quantity,
            newQuantity: product.quantity - item.quantity,
            userId: sale.salesRepId,
            userName: sale.salesRepName,
            createdAt: new Date().toISOString(),
          }
        })

        const newActivity: Activity = {
          id: Date.now().toString(),
          type: "sale",
          message: "recorded a sale",
          userId: sale.salesRepId,
          userName: sale.salesRepName,
          amount: sale.totalAmount,
          createdAt: new Date().toISOString(),
        }

        const salesReps = get().salesReps.map((rep) => {
          if (rep.id === sale.salesRepId) {
            return {
              ...rep,
              todaySales: rep.todaySales + sale.totalAmount,
              totalSales: rep.totalSales + sale.totalAmount,
            }
          }
          return rep
        })

        set((state) => ({
          products,
          sales: [newSale, ...state.sales],
          stockLogs: [...newLogs, ...state.stockLogs],
          activities: [newActivity, ...state.activities],
          salesReps,
        }))
      },

      approveSale: (saleId) => {
        const sale = get().sales.find((s) => s.id === saleId)
        set((state) => ({
          sales: state.sales.map((s) => (s.id === saleId ? { ...s, status: "approved" as const } : s)),
          activities: sale
            ? [
                {
                  id: Date.now().toString(),
                  type: "approval" as const,
                  message: `approved sale of ₦${sale.totalAmount.toLocaleString()}`,
                  userId: "owner",
                  userName: "Owner",
                  amount: sale.totalAmount,
                  createdAt: new Date().toISOString(),
                },
                ...state.activities,
              ]
            : state.activities,
        }))
      },

      disputeSale: (saleId) => {
        const sale = get().sales.find((s) => s.id === saleId)

        if (sale) {
          const products = get().products.map((product) => {
            const saleItem = sale.items.find((item) => item.productId === product.id)
            if (saleItem) {
              return {
                ...product,
                quantity: product.quantity + saleItem.quantity,
                updatedAt: new Date().toISOString(),
              }
            }
            return product
          })

          // Deduct from sales rep's totals
          const salesReps = get().salesReps.map((rep) => {
            if (rep.id === sale.salesRepId) {
              return {
                ...rep,
                todaySales: Math.max(0, rep.todaySales - sale.totalAmount),
                totalSales: Math.max(0, rep.totalSales - sale.totalAmount),
              }
            }
            return rep
          })

          set((state) => ({
            products,
            salesReps,
            sales: state.sales.map((s) => (s.id === saleId ? { ...s, status: "disputed" as const } : s)),
            activities: [
              {
                id: Date.now().toString(),
                type: "approval" as const,
                message: `disputed sale of ₦${sale.totalAmount.toLocaleString()}`,
                userId: "owner",
                userName: "Owner",
                amount: sale.totalAmount,
                createdAt: new Date().toISOString(),
              },
              ...state.activities,
            ],
          }))
        }
      },

      addActivity: (activity) => {
        const newActivity: Activity = {
          ...activity,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ activities: [newActivity, ...state.activities] }))
      },

      addSalesRep: (rep) => {
        const newRep: SalesRep = {
          ...rep,
          id: Date.now().toString(),
          todaySales: 0,
          totalSales: 0,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ salesReps: [...state.salesReps, newRep] }))

        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "login",
          message: `added new sales rep: ${rep.name}`,
          userId: "owner",
          userName: "Owner",
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ activities: [newActivity, ...state.activities] }))
      },

      updateSalesRep: (id, updates) => {
        set((state) => ({
          salesReps: state.salesReps.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        }))
      },

      deleteSalesRep: (id) => {
        set((state) => ({
          salesReps: state.salesReps.filter((r) => r.id !== id),
        }))
      },
    }),
    {
      name: "stocksight-store",
    },
  ),
)
