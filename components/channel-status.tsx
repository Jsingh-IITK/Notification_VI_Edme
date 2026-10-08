import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Smartphone, Bell, CheckCircle, AlertTriangle, XCircle, Settings } from "lucide-react"

const channels = [
  {
    id: "email",
    name: "Email",
    icon: Mail,
    status: "active",
    provider: "SendGrid",
    dailyLimit: 10000,
    dailyUsed: 2847,
    lastSent: "2 minutes ago",
    deliveryRate: 98.2,
    config: {
      apiKey: "configured",
      domain: "notifications.fitsol.com",
      templates: 18,
    },
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    icon: MessageSquare,
    status: "active",
    provider: "Twilio",
    dailyLimit: 5000,
    dailyUsed: 892,
    lastSent: "5 minutes ago",
    deliveryRate: 99.1,
    config: {
      apiKey: "configured",
      phoneNumber: "+1234567890",
      templates: 12,
    },
  },
  {
    id: "sms",
    name: "SMS",
    icon: Smartphone,
    status: "warning",
    provider: "MSG91",
    dailyLimit: 2000,
    dailyUsed: 1847,
    lastSent: "12 minutes ago",
    deliveryRate: 97.8,
    config: {
      apiKey: "configured",
      senderId: "FITSOL",
      templates: 8,
    },
  },
  {
    id: "in-app",
    name: "In-App Notifications",
    icon: Bell,
    status: "active",
    provider: "Internal",
    dailyLimit: 50000,
    dailyUsed: 12103,
    lastSent: "1 minute ago",
    deliveryRate: 100,
    config: {
      websocket: "connected",
      fallback: "enabled",
      templates: 9,
    },
  },
]

const statusConfig = {
  active: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50", badge: "default" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50", badge: "secondary" },
  error: { icon: XCircle, color: "text-green-500", bg: "bg-green-50", badge: "default" },
}

export function ChannelStatus() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {channels.map((channel) => {
        const status = statusConfig[channel.status as keyof typeof statusConfig]
        const StatusIcon = status.icon
        const ChannelIcon = channel.icon
        const usagePercentage = (channel.dailyUsed / channel.dailyLimit) * 100

        return (
          <Card key={channel.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <ChannelIcon className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium font-serif">{channel.name}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <StatusIcon className={`h-4 w-4 ${status.color}`} />
                <Badge variant={status.badge as any} className="text-xs font-serif">
                  {channel.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-serif">
                  <span className="text-muted-foreground">Daily Usage</span>
                  <span>
                    {channel.dailyUsed.toLocaleString()} / {channel.dailyLimit.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full ${
                      usagePercentage > 90 ? "bg-green-500" : usagePercentage > 70 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground font-serif">
                <div className="flex justify-between">
                  <span>Provider:</span>
                  <span>{channel.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Rate:</span>
                  <span>{channel.deliveryRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Sent:</span>
                  <span>{channel.lastSent}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full gap-2 font-serif bg-transparent">
                <Settings className="h-4 w-4" />
                Configure
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
