import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function QuickSetup() {
  return (
    <div className="flex space-x-2">
      <Button asChild>
        <Link href="/send">
          <Plus className="mr-2 h-4 w-4" />
          Send Notification
        </Link>
      </Button>
    </div>
  )
}
