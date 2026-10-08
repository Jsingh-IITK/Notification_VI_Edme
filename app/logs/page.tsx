"use client"

import { useMemo, useState } from "react"
import { LogsFilters } from "@/components/logs/logs-filters"
import { LogsStats } from "@/components/logs/logs-stats"
import { LogsTable } from "@/components/logs/logs-table"
import { allEvents, allTemplates, generateLogs, channels } from "@/utils/mock-data"

export default function LogsPage() {
  const [channel, setChannel] = useState<string>("all")
  const [eventKey, setEventKey] = useState<string>("all")
  const [templateId, setTemplateId] = useState<string>("all")
  const [status, setStatus] = useState<string>("all")
  const [fromDate, setFromDate] = useState<string>("")
  const [toDate, setToDate] = useState<string>("")

  const [page, setPage] = useState(1)
  const pageSize = 10

  const logs = useMemo(() => generateLogs(120), [])

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      if (channel !== "all" && l.channel !== channel) return false
      if (eventKey !== "all" && l.eventKey !== eventKey) return false
      if (templateId !== "all" && l.templateId !== templateId) return false
      if (status !== "all" && l.status !== status) return false
      if (fromDate && new Date(l.timestamp) < new Date(fromDate)) return false
      if (toDate && new Date(l.timestamp) > new Date(toDate + "T23:59:59")) return false
      return true
    })
  }, [logs, channel, eventKey, templateId, status, fromDate, toDate])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-pretty">Notification Logs</h1>
        <p className="text-sm text-muted-foreground">
          Track sends, statuses, and performance. Filter by channel, event, template, status, and date.
        </p>
      </header>

      <LogsStats items={filtered} />

      <LogsFilters
        channels={["all", ...channels]}
        events={["all", ...allEvents.map((e) => e.key)]}
        templates={["all", ...allTemplates.map((t) => t.id)]}
        values={{ channel, eventKey, templateId, status, fromDate, toDate }}
        onChange={{ setChannel, setEventKey, setTemplateId, setStatus, setFromDate, setToDate }}
        onSearch={() => setPage(1)}
      />

      <LogsTable
        items={pageItems}
        pagination={{
          page,
          totalPages,
          onPrev: () => setPage((p) => Math.max(1, p - 1)),
          onNext: () => setPage((p) => Math.min(totalPages, p + 1)),
        }}
      />
    </main>
  )
}
