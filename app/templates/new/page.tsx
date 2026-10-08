"use client"

import { TemplateForm } from "@/components/forms/template-form"

export default function NewTemplatePage() {
  return (
    <main className="p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-pretty">New Template</h1>
          <p className="text-sm text-muted-foreground">
            Create a template for Email or WhatsApp. Fields adapt to the selected channel.
          </p>
        </header>
        <TemplateForm />
      </div>
    </main>
  )
}
