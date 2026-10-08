import { DashboardLayout } from "@/components/dashboard-layout"
import { SendNotificationForm } from "@/components/send-notification-form"

export default function SendPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Send Notification</h1>
          <p className="text-muted-foreground font-serif">Send instant notifications to your contacts</p>
        </div>
        <SendNotificationForm />
      </div>
    </DashboardLayout>
  )
}
