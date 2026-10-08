import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search notifications, templates, audiences..." className="pl-10 font-serif" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button className="gap-2 font-serif">
          <Plus className="h-4 w-4" />
          Create Notification
        </Button>
      </div>
    </header>
  )
}
