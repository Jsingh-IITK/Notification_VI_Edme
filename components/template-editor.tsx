"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit3, Eye, Save, Send, Mail, MessageSquare, Smartphone, Bell } from "lucide-react"

const channels = [
  { value: "email", label: "Email", icon: Mail },
  { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { value: "sms", label: "SMS", icon: Smartphone },
  { value: "in-app", label: "In-App", icon: Bell },
]

const categories = ["Onboarding", "Transactional", "Marketing", "Billing", "Support", "Product", "Security"]

export function TemplateEditor() {
  const [selectedChannel, setSelectedChannel] = useState("email")
  const [templateName, setTemplateName] = useState("")
  const [templateCategory, setTemplateCategory] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")

  const selectedChannelData = channels.find((c) => c.value === selectedChannel)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans flex items-center gap-2">
          <Edit3 className="h-5 w-5" />
          Template Editor
        </CardTitle>
        <CardDescription className="font-serif">Create or edit message templates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Basic Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-name" className="font-serif">
              Template Name
            </Label>
            <Input
              id="template-name"
              placeholder="e.g., Welcome Email"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="font-serif"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-serif">Channel</Label>
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger className="font-serif">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {channels.map((channel) => (
                    <SelectItem key={channel.value} value={channel.value} className="font-serif">
                      <div className="flex items-center gap-2">
                        <channel.icon className="h-4 w-4" />
                        {channel.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-serif">Category</Label>
              <Select value={templateCategory} onValueChange={setTemplateCategory}>
                <SelectTrigger className="font-serif">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="font-serif">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Content Editor */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {selectedChannelData && <selectedChannelData.icon className="h-4 w-4" />}
            <h3 className="text-sm font-medium">Content Editor</h3>
            <Badge variant="outline" className="text-xs font-serif">
              {selectedChannelData?.label}
            </Badge>
          </div>

          {selectedChannel === "email" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-serif">
                  Subject Line
                </Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="font-serif"
                />
              </div>
              <Tabs defaultValue="html" className="w-full">
                <TabsList>
                  <TabsTrigger value="html" className="font-serif">
                    HTML
                  </TabsTrigger>
                  <TabsTrigger value="text" className="font-serif">
                    Plain Text
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="html" className="space-y-2">
                  <Label className="font-serif">HTML Content</Label>
                  <Textarea
                    placeholder="Enter HTML content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                  />
                </TabsContent>
                <TabsContent value="text" className="space-y-2">
                  <Label className="font-serif">Plain Text Content</Label>
                  <Textarea placeholder="Enter plain text content..." rows={8} className="font-serif" />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {selectedChannel === "sms" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-serif">SMS Content</Label>
                <span className="text-xs text-muted-foreground font-serif">{content.length}/160 characters</span>
              </div>
              <Textarea
                placeholder="Enter SMS message (160 characters max)..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={160}
                rows={4}
                className="font-serif"
              />
            </div>
          )}

          {(selectedChannel === "whatsapp" || selectedChannel === "in-app") && (
            <div className="space-y-2">
              <Label className="font-serif">Message Content</Label>
              <Textarea
                placeholder={`Enter ${selectedChannelData?.label} message...`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="font-serif"
              />
            </div>
          )}

          <div className="text-xs text-muted-foreground font-serif">
            <p>
              Available variables: {"{user.name}"}, {"{user.email}"}, {"{order.id}"}, {"{product.name}"}
            </p>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button className="gap-2 font-serif">
            <Save className="h-4 w-4" />
            Save Template
          </Button>
          <Button variant="outline" className="gap-2 font-serif bg-transparent">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="ghost" className="gap-2 font-serif">
            <Send className="h-4 w-4" />
            Test Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
