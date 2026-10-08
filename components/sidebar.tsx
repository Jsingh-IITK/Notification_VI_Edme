"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, FileText, Settings, Mail, MessageSquare, Send, GitBranch } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Events", href: "/events/new", icon: Send }, // replaced "Send" tab with "Events" tab
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Templates", href: "/templates", icon: FileText },
  { name: "Workflow Creator", href: "/workflows", icon: GitBranch }, // new nav item
]

const channels = [
  { name: "Email", icon: Mail, count: 1247, href: "/templates?channel=email" },
  { name: "WhatsApp", icon: MessageSquare, count: 892, href: "/templates?channel=whatsapp" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Send className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Fitsol</h1>
            <p className="text-xs text-muted-foreground font-serif">Notifications</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 font-serif",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </div>

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-serif">
            Channels
          </h3>
          <div className="mt-2 space-y-1">
            {channels.map((channel) => (
              <Link key={channel.name} href={channel.href}>
                <div className="flex items-center justify-between px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    {channel.icon && <channel.icon className="h-4 w-4" />}
                    <span className="font-serif">{channel.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{channel.count.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start gap-3 font-serif">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  )
}
