"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ChannelForm() {
  const { toast } = useToast()
  const [type, setType] = useState<"email" | "whatsapp" | "">("")

  const [emailCfg, setEmailCfg] = useState({ fromName: "", fromEmail: "" })
  const [waCfg, setWaCfg] = useState({ wabaNumber: "", templateNamespace: "", phoneId: "" })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = type === "email" ? { type, ...emailCfg } : { type, ...waCfg }
    console.log("[v0] Channel saved:", payload)
    toast({ title: "Channel saved", description: `Type: ${type || "not set"}` })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label>Channel Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === "email" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input
                  id="fromName"
                  value={emailCfg.fromName}
                  onChange={(e) => setEmailCfg((s) => ({ ...s, fromName: e.target.value }))}
                  placeholder="Acme Support"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  value={emailCfg.fromEmail}
                  onChange={(e) => setEmailCfg((s) => ({ ...s, fromEmail: e.target.value }))}
                  placeholder="support@acme.com"
                />
              </div>
            </div>
          )}

          {type === "whatsapp" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="waba">Business Number</Label>
                <Input
                  id="waba"
                  value={waCfg.wabaNumber}
                  onChange={(e) => setWaCfg((s) => ({ ...s, wabaNumber: e.target.value }))}
                  placeholder="+91 98xxxxx"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ns">Template Namespace</Label>
                <Input
                  id="ns"
                  value={waCfg.templateNamespace}
                  onChange={(e) => setWaCfg((s) => ({ ...s, templateNamespace: e.target.value }))}
                  placeholder="meta approved namespace"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pid">Phone ID</Label>
                <Input
                  id="pid"
                  value={waCfg.phoneId}
                  onChange={(e) => setWaCfg((s) => ({ ...s, phoneId: e.target.value }))}
                  placeholder="WABA Phone ID"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit">Save Channel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
