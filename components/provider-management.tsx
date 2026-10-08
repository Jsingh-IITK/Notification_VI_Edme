"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Settings,
  BarChart3,
  Zap,
} from "lucide-react"

const providers = {
  email: [
    {
      name: "SendGrid",
      status: "active",
      reliability: 99.2,
      avgLatency: "1.2s",
      monthlyCost: "$89",
      monthlyUsage: 45000,
      monthlyLimit: 100000,
      features: ["DKIM", "Analytics", "Templates"],
    },
    {
      name: "Mailgun",
      status: "backup",
      reliability: 98.8,
      avgLatency: "1.8s",
      monthlyCost: "$0",
      monthlyUsage: 0,
      monthlyLimit: 10000,
      features: ["DKIM", "Webhooks"],
    },
  ],
  sms: [
    {
      name: "MSG91",
      status: "active",
      reliability: 97.8,
      avgLatency: "2.1s",
      monthlyCost: "$156",
      monthlyUsage: 12000,
      monthlyLimit: 50000,
      features: ["DLT", "OTP", "Unicode"],
    },
    {
      name: "Twilio",
      status: "backup",
      reliability: 99.1,
      avgLatency: "1.5s",
      monthlyCost: "$0",
      monthlyUsage: 0,
      monthlyLimit: 5000,
      features: ["Global", "MMS", "Verify"],
    },
  ],
  whatsapp: [
    {
      name: "Twilio",
      status: "active",
      reliability: 99.1,
      avgLatency: "0.8s",
      monthlyCost: "$234",
      monthlyUsage: 8500,
      monthlyLimit: 25000,
      features: ["Rich Media", "Templates", "Webhooks"],
    },
  ],
}

export function ProviderManagement() {
  const [activeTab, setActiveTab] = useState("email")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Provider Management</CardTitle>
        <CardDescription className="font-serif">Monitor and manage communication service providers</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" className="font-serif">
              Email
            </TabsTrigger>
            <TabsTrigger value="sms" className="font-serif">
              SMS
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="font-serif">
              WhatsApp
            </TabsTrigger>
          </TabsList>

          {Object.entries(providers).map(([channel, channelProviders]) => (
            <TabsContent key={channel} value={channel} className="space-y-4 mt-4">
              {channelProviders.map((provider, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-medium">{provider.name}</h4>
                        <Badge
                          variant={provider.status === "active" ? "default" : "secondary"}
                          className="text-xs font-serif"
                        >
                          {provider.status}
                        </Badge>
                        {provider.reliability > 99 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground font-serif">Reliability</p>
                          <p className="text-sm font-medium">{provider.reliability}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-serif">Avg Latency</p>
                          <p className="text-sm font-medium">{provider.avgLatency}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-serif">Monthly Cost</p>
                          <p className="text-sm font-medium">{provider.monthlyCost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-serif">Usage</p>
                          <p className="text-sm font-medium">
                            {provider.monthlyUsage.toLocaleString()} / {provider.monthlyLimit.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs font-serif mb-1">
                          <span>Monthly Usage</span>
                          <span>{Math.round((provider.monthlyUsage / provider.monthlyLimit) * 100)}%</span>
                        </div>
                        <Progress value={(provider.monthlyUsage / provider.monthlyLimit) * 100} className="h-2" />
                      </div>

                      <div className="flex gap-1">
                        {provider.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs font-serif">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2 font-serif">
                          <Settings className="h-4 w-4" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 font-serif">
                          <BarChart3 className="h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 font-serif">
                          <Zap className="h-4 w-4" />
                          Test Connection
                        </DropdownMenuItem>
                        {provider.status === "backup" && (
                          <DropdownMenuItem className="gap-2 font-serif">
                            <TrendingUp className="h-4 w-4" />
                            Set as Primary
                          </DropdownMenuItem>
                        )}
                        {provider.status === "active" && (
                          <DropdownMenuItem className="gap-2 font-serif">
                            <TrendingDown className="h-4 w-4" />
                            Set as Backup
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
