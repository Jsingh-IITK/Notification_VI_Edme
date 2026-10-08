"use client"

import { Card, CardContent } from "@/components/ui/card"

type Item = {
  channel: "email" | "whatsapp"
  status: "sent" | "delivered" | "failed" | "opened" | "clicked"
}

export function LogsStats({ items }: { items: Item[] }) {
  const total = items.length
  const byChannel = {
    email: items.filter((i) => i.channel === "email").length,
    whatsapp: items.filter((i) => i.channel === "whatsapp").length,
  }
  const delivered = items.filter((i) => i.status === "delivered").length
  const failed = items.filter((i) => i.status === "failed").length
  const opened = items.filter((i) => i.status === "opened").length
  const clicked = items.filter((i) => i.status === "clicked").length
  const deliveryRate = total ? Math.round((delivered / total) * 100) : 0

  return (
    <section className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground">Total</div>
          <div className="text-xl font-semibold">{total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground">Delivery Rate</div>
          <div className="text-xl font-semibold">{deliveryRate}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground">Email</div>
          <div className="text-xl font-semibold">{byChannel.email}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground">WhatsApp</div>
          <div className="text-xl font-semibold">{byChannel.whatsapp}</div>
        </CardContent>
      </Card>
      <div className="md:col-span-4 grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Opened</div>
            <div className="text-lg font-medium">{opened}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Clicked</div>
            <div className="text-lg font-medium">{clicked}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Delivered</div>
            <div className="text-lg font-medium">{delivered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Failed</div>
            <div className="text-lg font-medium">{failed}</div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
