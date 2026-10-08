import { DashboardLayout } from "@/components/dashboard-layout"
import { AudienceOverview } from "@/components/audience-overview"
import { AudienceList } from "@/components/audience-list"
import { AudienceBuilder } from "@/components/audience-builder"

export default function AudiencesPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Audience Management</h1>
            <p className="text-muted-foreground font-serif">
              Create and manage customer segments for targeted communications
            </p>
          </div>
        </div>

        <AudienceOverview />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AudienceList />
          </div>
          <div>
            <AudienceBuilder />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
