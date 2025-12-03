"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockSales = [
  { id: 1, product: "iPhone 15 Pro Case", quantity: 2, amount: "₦8,500", time: "10:30 AM", rep: "Amina" },
  { id: 2, product: "Samsung Charger", quantity: 1, amount: "₦4,200", time: "10:15 AM", rep: "Chidi" },
  { id: 3, product: "Wireless Earbuds", quantity: 3, amount: "₦15,000", time: "09:45 AM", rep: "Amina" },
  { id: 4, product: "Screen Protector", quantity: 5, amount: "₦7,500", time: "09:30 AM", rep: "Bola" },
  { id: 5, product: "USB Cable", quantity: 2, amount: "₦2,000", time: "09:00 AM", rep: "Chidi" },
]

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
}

export function RecentSalesTable() {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
      style={{ boxShadow: "0 4px 20px rgba(15, 61, 62, 0.08)" }}
    >
      <div className="p-6 border-b border-border">
        <h3 className="font-serif text-lg font-semibold">{t.recentSales}</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Sales Rep</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSales.map((sale, index) => (
            <motion.tr
              key={sale.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={rowVariants}
              className="border-b border-border last:border-0"
            >
              <TableCell className="font-medium">{sale.product}</TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell className="font-serif font-semibold">{sale.amount}</TableCell>
              <TableCell className="text-muted-foreground">{sale.time}</TableCell>
              <TableCell>
                <Badge variant="secondary">{sale.rep}</Badge>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}
