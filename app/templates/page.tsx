import { DashboardLayout } from "@/components/dashboard-layout"
import { TemplateLibrary } from "@/components/template-library"

export default function TemplatesPage({
  searchParams,
}: {
  searchParams: { channel?: string }
}) {
  const selectedChannel = searchParams.channel

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {selectedChannel
                ? `${selectedChannel.charAt(0).toUpperCase() + selectedChannel.slice(1)} Templates`
                : "Template Management"}
            </h1>
            <p className="text-muted-foreground font-serif">
              {selectedChannel
                ? `Manage ${selectedChannel} templates and messaging content`
                : "Create and manage on-brand message templates for all communication channels"}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <TemplateLibrary selectedChannel={selectedChannel} />
        </div>
      </div>
    </DashboardLayout>
  )
}
