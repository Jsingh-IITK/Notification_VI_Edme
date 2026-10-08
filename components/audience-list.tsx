"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Users,
  Target,
  Download,
  Upload,
  Edit,
  Copy,
  Trash2,
  RefreshCw,
} from "lucide-react"

const audiences = [
  {
    id: 1,
    name: "New Trial Users",
    description: "Users who started a trial in the last 30 days",
    type: "dynamic",
    size: 1247,
    growth: "+12.5%",
    lastUpdated: "2 minutes ago",
    engagement: 78.4,
    status: "active",
  },
  {
    id: 2,
    name: "High-Value Customers",
    description: "Customers with orders > $500 in last 6 months",
    type: "dynamic",
    size: 892,
    growth: "+8.2%",
    lastUpdated: "5 minutes ago",
    engagement: 85.2,
    status: "active",
  },
  {
    id: 3,
    name: "Marketplace Sellers",
    description: "Active sellers on the marketplace platform",
    type: "static",
    size: 456,
    growth: "+3.1%",
    lastUpdated: "1 hour ago",
    engagement: 72.6,
    status: "active",
  },
  {
    id: 4,
    name: "Inactive Users",
    description: "Users with no login in last 60 days",
    type: "dynamic",
    size: 2103,
    growth: "-5.4%",
    lastUpdated: "10 minutes ago",
    engagement: 23.1,
    status: "active",
  },
  {
    id: 5,
    name: "Beta Feature Users",
    description: "Users enrolled in beta testing program",
    type: "static",
    size: 234,
    growth: "+15.2%",
    lastUpdated: "3 hours ago",
    engagement: 91.7,
    status: "draft",
  },
  {
    id: 6,
    name: "Newsletter Subscribers",
    description: "Opted-in email newsletter recipients",
    type: "static",
    size: 5847,
    growth: "+6.8%",
    lastUpdated: "1 day ago",
    engagement: 45.3,
    status: "active",
  },
]

export function AudienceList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAudiences = audiences.filter(
    (audience) =>
      audience.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audience.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-sans">Audience Lists</CardTitle>
            <CardDescription className="font-serif">Manage your customer segments and targeting lists</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 font-serif bg-transparent">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button className="gap-2 font-serif">
              <Plus className="h-4 w-4" />
              New Audience
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search audiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 font-serif"
          />
        </div>

        <div className="space-y-3">
          {filteredAudiences.map((audience) => (
            <div
              key={audience.id}
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0">
                {audience.type === "dynamic" ? (
                  <Target className="h-5 w-5 text-blue-500" />
                ) : (
                  <Users className="h-5 w-5 text-green-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium truncate">{audience.name}</h4>
                  <Badge variant={audience.type === "dynamic" ? "default" : "secondary"} className="text-xs font-serif">
                    {audience.type}
                  </Badge>
                  <Badge
                    variant={audience.status === "active" ? "default" : "secondary"}
                    className="text-xs font-serif"
                  >
                    {audience.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-serif mt-1">{audience.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-serif">
                  <span>{audience.size.toLocaleString()} contacts</span>
                  <span>•</span>
                  <span
                    className={
                      audience.growth.startsWith("+") || audience.growth.startsWith("-") ? "text-green-500" : ""
                    }
                  >
                    {audience.growth}
                  </span>
                  <span>•</span>
                  <span>{audience.engagement}% engagement</span>
                  <span>•</span>
                  <span>Updated {audience.lastUpdated}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2 font-serif">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                {audience.type === "dynamic" && (
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2 font-serif">
                      <Edit className="h-4 w-4" />
                      Edit Audience
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 font-serif">
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 font-serif">
                      <Download className="h-4 w-4" />
                      Export CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 font-serif text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
