"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { allEvents, allTemplates, channels } from "@/utils/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Channel } from "@/utils/mock-data"
import { useToast } from "@/hooks/use-toast" // feedback on save

export function WorkflowForm() {
  const { toast } = useToast() // toast feedback

  const [name, setName] = useState("New Workflow")
  const [eventKey, setEventKey] = useState<string>(allEvents[0]?.key || "")
  const [channel, setChannel] = useState<Channel>((channels[0] as Channel) || "email")

  // Templates filtered by selected channel
  const templatesForChannel = useMemo(() => allTemplates.filter((t) => t.channel === channel), [channel])
  const [templateId, setTemplateId] = useState<string>(templatesForChannel[0]?.id || "")

  // if channel changes, ensure selected template still valid
  useEffect(() => {
    if (!templatesForChannel.find((t) => t.id === templateId)) {
      setTemplateId(templatesForChannel[0]?.id || "")
    }
  }, [channel, templatesForChannel, templateId])

  const canPickChannel = Boolean(eventKey)
  const canPickTemplate = templatesForChannel.length > 0
  const canSave = Boolean(name.trim() && eventKey && channel && templateId)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSave) {
      toast({
        title: "Incomplete workflow",
        description: "Please select an event, channel, and a template.",
        variant: "destructive",
      })
      return
    }
    const payload = { name, eventKey, channel, templateId }
    console.log("[v0] Workflow saved:", payload)
    toast({ title: "Workflow saved", description: "Your workflow was saved successfully." })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="wname">Workflow Name</Label>
            <Input id="wname" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Event</Label>
            <Select value={eventKey} onValueChange={setEventKey}>
              <SelectTrigger>
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                {allEvents.map((e) => (
                  <SelectItem key={e.key} value={e.key}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Channel</Label>
            <Select value={channel} onValueChange={(v) => setChannel(v as Channel)} disabled={!canPickChannel}>
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                {channels.map((ch) => (
                  <SelectItem key={ch} value={ch}>
                    {ch === "email" ? "Email" : "WhatsApp"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!canPickChannel && (
              <p className="text-xs text-muted-foreground">Select an event first to choose a channel.</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Template</Label>
            <Select value={templateId} onValueChange={setTemplateId} disabled={!canPickTemplate}>
              <SelectTrigger>
                <SelectValue placeholder={canPickTemplate ? "Select template" : "No templates for this channel"} />
              </SelectTrigger>
              <SelectContent>
                {templatesForChannel.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!canPickTemplate && (
              <p className="text-xs text-muted-foreground">
                No templates found for {channel === "email" ? "Email" : "WhatsApp"}. Create one in Templates.
              </p>
            )}
          </div>

          <div className="rounded-md border p-4 bg-muted/30 text-sm">
            <div className="font-medium mb-1">Summary</div>
            <div>
              When <b>{allEvents.find((e) => e.key === eventKey)?.name || "…"}</b> happens → send{" "}
              <b>{channel === "email" ? "Email" : "WhatsApp"}</b> using template{" "}
              <b>{allTemplates.find((t) => t.id === templateId)?.name || "…"}</b>.
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={!canSave}>
              Save Workflow
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
