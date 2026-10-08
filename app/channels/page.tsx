import { DashboardLayout } from "@/components/dashboard-layout"
import { ChannelStatus } from "@/components/channel-status"
import { ChannelConfiguration } from "@/components/channel-configuration"
import { ProviderManagement } from "@/components/provider-management"

export default function ChannelsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Channel Integration</h1>
            <p className="text-muted-foreground font-serif">
              Configure and manage communication channels and service providers
            </p>
          </div>
        </div>

        <ChannelStatus />

        <div className="grid gap-6 lg:grid-cols-2">
          <ChannelConfiguration />
          <ProviderManagement />
        </div>
      </div>
    </DashboardLayout>
  )
}
