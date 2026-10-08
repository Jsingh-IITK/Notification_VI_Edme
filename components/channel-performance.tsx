import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { channel: "Email", sent: 12400, delivered: 12180, opened: 3050, clicked: 610 },
  { channel: "WhatsApp", sent: 8920, delivered: 8830, opened: 2650, clicked: 530 },
  { channel: "SMS", sent: 4560, delivered: 4480, opened: 0, clicked: 0 },
  { channel: "In-App", sent: 21030, delivered: 20850, opened: 6250, clicked: 1250 },
]

export function ChannelPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Channel Performance</CardTitle>
        <CardDescription className="font-serif">
          Delivery and engagement metrics by communication channel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="channel" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sent" fill="hsl(var(--chart-1))" name="Sent" />
            <Bar dataKey="delivered" fill="hsl(var(--chart-2))" name="Delivered" />
            <Bar dataKey="opened" fill="hsl(var(--chart-3))" name="Opened" />
            <Bar dataKey="clicked" fill="hsl(var(--chart-4))" name="Clicked" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
