"use client"

import { ChannelForm } from "@/components/forms/channel-form"

export default function NewChannelPage() {
  return (
    <main className="p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-pretty">Add Channel</h1>
          <p className="text-sm text-muted-foreground">Configure Email or WhatsApp for sending notifications.</p>
        </header>
        <ChannelForm />
      </div>
    </main>
  )
}
