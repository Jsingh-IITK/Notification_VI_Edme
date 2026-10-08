import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Mail, MessageSquare, Smartphone, Bell, FileText } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 font-serif bg-transparent">
            Quick Actions
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="gap-2 font-serif">
            <Mail className="h-4 w-4" />
            Send Email Campaign
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 font-serif">
            <MessageSquare className="h-4 w-4" />
            Send WhatsApp Message
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 font-serif">
            <Smartphone className="h-4 w-4" />
            Send SMS Alert
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 font-serif">
            <Bell className="h-4 w-4" />
            Create In-App Notification
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 font-serif">
            <FileText className="h-4 w-4" />
            Create Template
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
