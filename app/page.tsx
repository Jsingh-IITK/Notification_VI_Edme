import { DashboardLayout } from "@/components/dashboard-layout"
import { EssentialMetrics } from "@/components/essential-metrics"
import { RecentNotifications } from "@/components/recent-notifications"
import { QuickSetup } from "@/components/quick-setup"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notification Dashboard</h1>
            <p className="text-muted-foreground font-serif">Simple customer notifications for your startup</p>
          </div>
          <QuickSetup />
        </div>

        <EssentialMetrics />
        <RecentNotifications />
      </div>
    </DashboardLayout>
  )
}
