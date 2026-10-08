import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Smartphone, Bell, CheckCircle, AlertCircle, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "email",
    title: "Welcome Email Sequence",
    description: "Sent to new Kyoto SaaS trial users",
    status: "delivered",
    count: 47,
    time: "2 minutes ago",
    icon: Mail,
  },
  {
    id: 2,
    type: "whatsapp",
    title: "Order Shipped Notification",
    description: "Marketplace order #MP-2847",
    status: "delivered",
    count: 1,
    time: "5 minutes ago",
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "sms",
    title: "Two-Factor Authentication",
    description: "Login verification codes",
    status: "delivered",
    count: 23,
    time: "12 minutes ago",
    icon: Smartphone,
  },
  {
    id: 4,
    type: "in-app",
    title: "Feature Announcement",
    description: "New logistics dashboard features",
    status: "pending",
    count: 156,
    time: "18 minutes ago",
    icon: Bell,
  },
  {
    id: 5,
    type: "email",
    title: "Weekly Analytics Report",
    description: "Sent to marketplace sellers",
    status: "failed",
    count: 3,
    time: "25 minutes ago",
    icon: Mail,
  },
]

const statusConfig = {
  delivered: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50" },
  failed: { icon: AlertCircle, color: "text-green-500", bg: "bg-green-50" },
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Recent Activity</CardTitle>
        <CardDescription className="font-serif">Latest notification sends and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const status = statusConfig[activity.status as keyof typeof statusConfig]
            const StatusIcon = status.icon
            const ChannelIcon = activity.icon

            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="flex-shrink-0">
                  <ChannelIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium truncate">{activity.title}</h4>
                    <Badge variant="secondary" className="text-xs font-serif">
                      {activity.count}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-serif mt-1">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <StatusIcon className={`h-3 w-3 ${status.color}`} />
                    <span className={`text-xs capitalize ${status.color} font-serif`}>{activity.status}</span>
                    <span className="text-xs text-muted-foreground font-serif">• {activity.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
