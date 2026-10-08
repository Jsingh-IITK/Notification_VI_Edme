import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageCircle, TrendingUp, Users } from "lucide-react"

export function EssentialMetrics() {
  const metrics = [
    {
      title: "Messages Sent",
      value: "1,234",
      change: "+12%",
      icon: Mail,
      description: "Total notifications sent",
    },
    {
      title: "Delivery Rate",
      value: "98.5%",
      change: "+2.1%",
      icon: TrendingUp,
      description: "Successfully delivered",
    },
    {
      title: "Active Contacts",
      value: "856",
      change: "+5.2%",
      icon: Users,
      description: "Contacts in your lists",
    },
    {
      title: "WhatsApp Sent",
      value: "432",
      change: "+8.3%",
      icon: MessageCircle,
      description: "WhatsApp messages",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{metric.change}</span> from last month
            </p>
            <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
