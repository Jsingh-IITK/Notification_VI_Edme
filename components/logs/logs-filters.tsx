"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
  channels: string[]
  events: string[]
  templates: string[]
  values: {
    channel: string
    eventKey: string
    templateId: string
    status: string
    fromDate: string
    toDate: string
  }
  onChange: {
    setChannel: (v: string) => void
    setEventKey: (v: string) => void
    setTemplateId: (v: string) => void
    setStatus: (v: string) => void
    setFromDate: (v: string) => void
    setToDate: (v: string) => void
  }
  onSearch: () => void
}

export function LogsFilters({ channels, events, templates, values, onChange, onSearch }: Props) {
  return (
    <section className="rounded-lg border p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label>Channel</Label>
          <Select value={values.channel} onValueChange={onChange.setChannel}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {channels.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === "all" ? "All" : c === "email" ? "Email" : "WhatsApp"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Event</Label>
          <Select value={values.eventKey} onValueChange={onChange.setEventKey}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {events.map((e) => (
                <SelectItem key={e} value={e}>
                  {e === "all" ? "All" : e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Template</Label>
          <Select value={values.templateId} onValueChange={onChange.setTemplateId}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((t) => (
                <SelectItem key={t} value={t}>
                  {t === "all" ? "All" : t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Status</Label>
          <Select value={values.status} onValueChange={onChange.setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {["all", "sent", "delivered", "failed", "opened", "clicked"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s[0].toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>From</Label>
          <Input type="date" value={values.fromDate} onChange={(e) => onChange.setFromDate(e.target.value)} />
        </div>

        <div className="grid gap-2">
          <Label>To</Label>
          <Input type="date" value={values.toDate} onChange={(e) => onChange.setToDate(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={onSearch}>Apply Filters</Button>
      </div>
    </section>
  )
}
