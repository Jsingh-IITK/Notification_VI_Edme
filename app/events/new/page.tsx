"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { EventForm } from "@/components/forms/event-form"

export default function NewEventPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <header>
            <h1 className="text-2xl font-semibold text-pretty">Create Event</h1>
            <p className="text-sm text-muted-foreground">Register an event key that can trigger notifications.</p>
          </header>
          <EventForm />
        </div>
      </div>
    </DashboardLayout>
  )
}
