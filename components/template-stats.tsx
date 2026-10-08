import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Mail, MessageSquare, Smartphone, Bell } from "lucide-react"

const stats = [
  {
    title: "Total Templates",
    value: "47",
    icon: FileText,
    description: "Across all channels",
  },
  {
    title: "Email Templates",
    value: "18",
    icon: Mail,
    description: "HTML & text formats",
  },
  {
    title: "WhatsApp Templates",
    value: "12",
    icon: MessageSquare,
    description: "Rich media supported",
  },
  {
    title: "SMS Templates",
    value: "8",
    icon: Smartphone,
    description: "Character optimized",
  },
  {
    title: "In-App Templates",
    value: "9",
    icon: Bell,
    description: "Interactive elements",
  },
]

export function TemplateStats() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-serif text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground font-serif mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
