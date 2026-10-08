"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTemplateVariables } from "@/utils/variables"
import { product } from "@/utils/product" // Declare the product variable

type Channel = "email" | "whatsapp"

export function TemplateForm() {
  const [channel, setChannel] = useState<Channel>("email")

  // email fields
  const [subject, setSubject] = useState("Welcome to Acme")
  const [body, setBody] = useState("Hi {{name}}, thanks for joining us!")

  // whatsapp fields
  const [waName, setWaName] = useState("order_update")
  const [waLang, setWaLang] = useState("en")
  const [waTemplateId, setWaTemplateId] = useState("meta_approved_template_id")
  const [waBody, setWaBody] = useState("Hi {{1}}, your order {{2}} is {{3}}.")

  const vars = useMemo(() => getTemplateVariables(), [])
  const combinedVars = useMemo(() => ({ ...vars, product }), [vars])

  const renderedEmail = useMemo(() => {
    let out = body
    Object.entries(combinedVars).forEach(([k, v]) => {
      out = out.replaceAll(`{{${k}}}`, String(v))
    })
    return out
  }, [body, combinedVars])

  const renderedWA = useMemo(() => {
    let out = waBody
    // Replace numbered placeholders {{1}}, {{2}} with examples
    const numbered = ["Alice", "#A-1023", "confirmed"]
    numbered.forEach((v, i) => {
      out = out.replaceAll(`{{${i + 1}}}`, v)
    })
    return out
  }, [waBody])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload =
      channel === "email"
        ? { channel, subject, body }
        : { channel, name: waName, language: waLang, templateId: waTemplateId, body: waBody }
    console.log("[v0] Template saved:", payload)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label>Channel</Label>
            <Select value={channel} onValueChange={(v) => setChannel(v as Channel)}>
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {channel === "email" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="subj">Subject</Label>
                <Input id="subj" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="body">{"Body (use variables like {{name}}, {{product}})"}</Label>
                <Textarea id="body" rows={8} value={body} onChange={(e) => setBody(e.target.value)} />
                <div className="text-xs text-muted-foreground">
                  {/* Show available variables including product */}
                  Available:{" "}
                  {Object.keys(combinedVars)
                    .map((k) => `{{${k}}}`)
                    .join(", ")}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Preview</Label>
                <div className="rounded-md border p-4 bg-background">
                  <div className="text-sm font-medium mb-2">{subject}</div>
                  <div className="text-sm whitespace-pre-wrap">{renderedEmail}</div>
                </div>
              </div>
            </div>
          )}

          {channel === "whatsapp" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="waname">Meta Template Name</Label>
                <Input
                  id="waname"
                  value={waName}
                  onChange={(e) => setWaName(e.target.value)}
                  placeholder="order_update"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="waid">Meta Template ID</Label>
                <Input
                  id="waid"
                  value={waTemplateId}
                  onChange={(e) => setWaTemplateId(e.target.value)}
                  placeholder="meta_approved_template_id"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="walang">Language</Label>
                <Input id="walang" value={waLang} onChange={(e) => setWaLang(e.target.value)} placeholder="en" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="wabody">{"Body (use {{1}}, {{2}}, ...)"}</Label>
                <Textarea id="wabody" rows={8} value={waBody} onChange={(e) => setWaBody(e.target.value)} />
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>{"{{1}} = name"}</span>
                  <span>{"{{2}} = order_id"}</span>
                  <span>{"{{3}} = status"}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Preview</Label>
                <div className="rounded-md border p-4 bg-background">
                  <div className="text-xs text-muted-foreground mb-1">WhatsApp preview</div>
                  <div className="text-sm whitespace-pre-wrap">{renderedWA}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit">Save Template</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
