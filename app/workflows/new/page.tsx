"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { WorkflowForm } from "@/components/forms/workflow-form"

export default function NewWorkflowPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <header>
            <h1 className="text-2xl font-semibold text-pretty">Create Workflow</h1>
            <p className="text-sm text-muted-foreground">
              Link an event to a channel and a template. MVP supports one-trigger → one-message.
            </p>
          </header>
          <WorkflowForm />
        </div>
      </div>
    </DashboardLayout>
  )
}
