import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageCircle, Clock, CheckCircle, XCircle } from "lucide-react"

export function RecentNotifications() {
  const notifications = [
    {
      id: 1,
      type: "email",
      template: "Welcome Email",
      recipient: "john@example.com",
      status: "delivered",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      type: "whatsapp",
      template: "Order Confirmation",
      recipient: "+91 98765 43210",
      status: "delivered",
      timestamp: "5 minutes ago",
    },
    {
      id: 3,
      type: "email",
      template: "Password Reset",
      recipient: "sarah@example.com",
      status: "pending",
      timestamp: "8 minutes ago",
    },
    {
      id: 4,
      type: "whatsapp",
      template: "Cart Reminder",
      recipient: "+91 87654 32109",
      status: "failed",
      timestamp: "12 minutes ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-green-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      delivered: "default",
      pending: "secondary",
      failed: "secondary",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {notification.type === "email" ? (
                  <Mail className="h-5 w-5 text-blue-600" />
                ) : (
                  <MessageCircle className="h-5 w-5 text-green-600" />
                )}
                <div>
                  <p className="font-medium">{notification.template}</p>
                  <p className="text-sm text-muted-foreground">{notification.recipient}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(notification.status)}
                {getStatusBadge(notification.status)}
                <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
