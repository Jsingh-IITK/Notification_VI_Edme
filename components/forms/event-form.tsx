"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function EventForm() {
  const { toast } = useToast()
  const [values, setValues] = useState({
    key: "",
    name: "",
    source: "ga4",
    description: "",
    samplePayload: '{ "userId": "123", "email": "john@example.com" }',
  })

  function update<K extends keyof typeof values>(k: K, v: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [k]: v }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log("[v0] Event saved:", values)
    toast({ title: "Event saved", description: `Key: ${values.key}` })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="key">Event Key</Label>
            <Input
              id="key"
              placeholder="user_signed_up"
              value={values.key}
              onChange={(e) => update("key", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              placeholder="User Signed Up"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              placeholder="ga4 | backend | marketplace"
              value={values.source}
              onChange={(e) => update("source", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="When a user completes sign up..."
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sample">Sample Payload (JSON)</Label>
            <Textarea
              id="sample"
              className="font-mono"
              rows={6}
              value={values.samplePayload}
              onChange={(e) => update("samplePayload", e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Event</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
