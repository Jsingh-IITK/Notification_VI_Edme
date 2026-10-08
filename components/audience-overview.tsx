import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, Target, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Contacts",
    value: "24,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "Active customer records",
  },
  {
    title: "Active Segments",
    value: "18",
    change: "+3",
    trend: "up",
    icon: Target,
    description: "Dynamic audience lists",
  },
  {
    title: "New Contacts",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: UserPlus,
    description: "Added this month",
  },
  {
    title: "Engagement Rate",
    value: "68.4%",
    change: "+4.1%",
    trend: "up",
    icon: TrendingUp,
    description: "Across all segments",
  },
]

export function AudienceOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-serif text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-serif">
              <span className="text-green-500">{stat.change}</span>
              <span>{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
