export type Channel = "email" | "whatsapp"

export const channels: Channel[] = ["email", "whatsapp"]

export const allEvents = [
  { key: "user_signed_up", name: "User Signed Up" },
  { key: "order_placed", name: "Order Placed" },
  { key: "cart_abandoned", name: "Cart Abandoned" },
]

export const allTemplates = [
  { id: "tmpl_email_welcome", name: "Welcome Email", channel: "email" as Channel },
  { id: "tmpl_email_order", name: "Order Confirmation", channel: "email" as Channel },
  { id: "tmpl_wa_order", name: "WA Order Update", channel: "whatsapp" as Channel },
]

export function generateLogs(count = 50) {
  const statuses = ["sent", "delivered", "failed", "opened", "clicked"] as const
  const out: Array<{
    id: string
    channel: Channel
    eventKey: string
    templateId: string
    status: (typeof statuses)[number]
    timestamp: string
    to: string
  }> = []

  for (let i = 0; i < count; i++) {
    const ch = channels[Math.floor(Math.random() * channels.length)]
    const ev = allEvents[Math.floor(Math.random() * allEvents.length)]
    const tByCh = allTemplates.filter((t) => t.channel === ch)
    const tmpl = tByCh[Math.floor(Math.random() * tByCh.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const now = new Date()
    const ts = new Date(now.getTime() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 14)) // last 14 days
    out.push({
      id: `log_${i}_${ts.getTime()}`,
      channel: ch,
      eventKey: ev.key,
      templateId: tmpl.id,
      status,
      timestamp: ts.toISOString(),
      to: ch === "email" ? `user${i}@example.com` : `+91-98${(100000 + i).toString().slice(0, 5)}`,
    })
  }
  return out.sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
}
