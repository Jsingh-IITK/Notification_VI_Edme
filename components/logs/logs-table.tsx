"use client"

type LogItem = {
  id: string
  channel: "email" | "whatsapp"
  eventKey: string
  templateId: string
  status: "sent" | "delivered" | "failed" | "opened" | "clicked"
  timestamp: string
  to: string
}

export function LogsTable({
  items,
  pagination,
}: {
  items: LogItem[]
  pagination: { page: number; totalPages: number; onPrev: () => void; onNext: () => void }
}) {
  return (
    <section className="rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="p-3">Time</th>
              <th className="p-3">Channel</th>
              <th className="p-3">Event</th>
              <th className="p-3">Template</th>
              <th className="p-3">To</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-3">{new Date(i.timestamp).toLocaleString()}</td>
                <td className="p-3">{i.channel === "email" ? "Email" : "WhatsApp"}</td>
                <td className="p-3">{i.eventKey}</td>
                <td className="p-3">{i.templateId}</td>
                <td className="p-3">{i.to}</td>
                <td className="p-3 capitalize">{i.status}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={6}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between p-3">
        <span className="text-xs text-muted-foreground">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={pagination.onPrev}
            disabled={pagination.page <= 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={pagination.onNext}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
