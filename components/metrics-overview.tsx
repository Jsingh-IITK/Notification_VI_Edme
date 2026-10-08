import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Mail, MessageSquare, Smartphone } from "lucide-react"

const metrics = [
  {
    title: "Total Sent",
    value: "24,847",
    change: "+12.5%",
    trend: "up",
    icon: Mail,
    description: "Last 30 days",
  },
  {
    title: "Delivery Rate",
    value: "98.2%",
    change: "+0.8%",
    trend: "up",
    icon: TrendingUp,
    description: "Across all channels",
  },
  {
    title: "Open Rate",
    value: "24.6%",
    change: "-2.1%",
    trend: "down",
    icon: MessageSquare,
    description: "Email & WhatsApp",
  },
  {
    title: "Click Rate",
    value: "4.8%",
    change: "+1.2%",
    trend: "up",
    icon: Smartphone,
    description: "All interactive content",
  },
]

export function MetricsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-serif text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-serif">
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-500" />
              )}
              <span className="text-green-500">{metric.change}</span>
              <span>{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
