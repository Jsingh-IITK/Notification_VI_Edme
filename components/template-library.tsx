"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Plus, MoreHorizontal, Mail, MessageSquare, Eye, Copy, Edit, Trash2, CheckCircle } from "lucide-react"
import { EmailTemplateEditor } from "./email-template-editor"
import { WhatsAppTemplateEditor } from "./whatsapp-template-editor"

const templates = {
  email: [
    {
      id: 1,
      name: "Welcome Email",
      description: "New user onboarding sequence",
      category: "Onboarding",
      lastModified: "2 days ago",
      usage: 1247,
      status: "active",
    },
    {
      id: 2,
      name: "Order Confirmation",
      description: "Marketplace purchase confirmation",
      category: "Transactional",
      lastModified: "1 week ago",
      usage: 892,
      status: "active",
    },
    {
      id: 3,
      name: "Payment Reminder",
      description: "Overdue invoice notification",
      category: "Billing",
      lastModified: "5 days ago",
      usage: 45,
      status: "draft",
    },
  ],
  whatsapp: [
    {
      id: 4,
      name: "order_confirmation",
      description: "Hi {{1}}, your order {{2}} is confirmed and will be delivered by {{3}}.",
      category: "Transactional",
      lastModified: "1 day ago",
      usage: 756,
      status: "meta_approved",
      metaTemplateId: "order_confirmation_v2",
      language: "en",
    },
    {
      id: 5,
      name: "shipping_update",
      description: "Your order {{1}} has been shipped! Track: {{2}}",
      category: "Transactional",
      lastModified: "3 days ago",
      usage: 234,
      status: "meta_approved",
      metaTemplateId: "shipping_update_v1",
      language: "en",
    },
    {
      id: 6,
      name: "welcome_message",
      description: "Welcome to Fitsol! We're excited to have you on board.",
      category: "Onboarding",
      lastModified: "1 week ago",
      usage: 89,
      status: "draft",
    },
  ],
}

const channelIcons = {
  email: Mail,
  whatsapp: MessageSquare,
}

interface TemplateLibraryProps {
  selectedChannel?: string
}

export function TemplateLibrary({ selectedChannel }: TemplateLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState(selectedChannel || "email")
  const [previewTemplate, setPreviewTemplate] = useState<any>(null)
  const [emailEditorOpen, setEmailEditorOpen] = useState(false)
  const [whatsappEditorOpen, setWhatsappEditorOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)

  useEffect(() => {
    if (selectedChannel) {
      setActiveTab(selectedChannel)
    }
  }, [selectedChannel])

  const availableChannels = selectedChannel ? [selectedChannel] : Object.keys(templates)
  const currentTemplates = selectedChannel
    ? { [selectedChannel]: templates[selectedChannel as keyof typeof templates] }
    : templates

  const filteredTemplates =
    currentTemplates[activeTab as keyof typeof currentTemplates]?.filter(
      (template) =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  const renderPreviewContent = (template: any, channel: string) => {
    if (channel === "email") {
      return (
        <div className="border rounded-lg p-4 bg-white">
          <div className="border-b pb-3 mb-4">
            <div className="text-sm text-muted-foreground">From: noreply@fitsol.com</div>
            <div className="text-sm text-muted-foreground">To: john.doe@example.com</div>
            <div className="font-medium mt-1">Subject: {template.name}</div>
          </div>
          <div className="space-y-3">
            <p className="font-serif">Hi John,</p>
            <p className="font-serif">{template.description}</p>
            <p className="font-serif">
              Best regards,
              <br />
              The Fitsol Team
            </p>
          </div>
        </div>
      )
    } else if (channel === "whatsapp") {
      let previewText = template.description
      if (previewText.includes("{{1}}")) previewText = previewText.replace(/\{\{1\}\}/g, "John")
      if (previewText.includes("{{2}}")) previewText = previewText.replace(/\{\{2\}\}/g, "#ORD12345")
      if (previewText.includes("{{3}}")) previewText = previewText.replace(/\{\{3\}\}/g, "Dec 25, 2024")

      return (
        <div className="max-w-sm mx-auto">
          <div className="bg-green-500 text-white p-3 rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">Fitsol Business</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-b-lg border border-t-0">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="font-serif text-sm">{previewText}</p>
              <div className="text-xs text-muted-foreground mt-2">12:34 PM ✓✓</div>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-sans">
                {selectedChannel
                  ? `${selectedChannel.charAt(0).toUpperCase() + selectedChannel.slice(1)} Templates`
                  : "Template Library"}
              </CardTitle>
              <CardDescription className="font-serif">
                {selectedChannel
                  ? `Manage your ${selectedChannel} message templates`
                  : "Manage your email and WhatsApp message templates"}
              </CardDescription>
            </div>
            <Button
              className="gap-2 font-serif"
              onClick={() => {
                setEditingTemplate(null)
                if (activeTab === "email") {
                  setEmailEditorOpen(true)
                } else if (activeTab === "whatsapp") {
                  setWhatsappEditorOpen(true)
                }
              }}
            >
              <Plus className="h-4 w-4" />
              {activeTab === "whatsapp" ? "Add Meta Template" : "New Template"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-serif"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {!selectedChannel && (
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="gap-2 font-serif">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="gap-2 font-serif">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </TabsTrigger>
              </TabsList>
            )}

            {availableChannels.map((channel) => (
              <TabsContent key={channel} value={channel} className="space-y-3 mt-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium truncate">{template.name}</h4>
                        {channel === "whatsapp" && template.status === "meta_approved" && (
                          <Badge variant="default" className="text-xs font-serif gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Meta Approved
                          </Badge>
                        )}
                        {template.status === "draft" && (
                          <Badge variant="secondary" className="text-xs font-serif">
                            Draft
                          </Badge>
                        )}
                        {template.status === "active" && channel === "email" && (
                          <Badge variant="default" className="text-xs font-serif">
                            Active
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs font-serif">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-serif mt-1">{template.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-serif">
                        <span>Modified {template.lastModified}</span>
                        <span>•</span>
                        <span>{template.usage.toLocaleString()} uses</span>
                        {channel === "whatsapp" && "metaTemplateId" in template && (
                          <>
                            <span>•</span>
                            <span>ID: {template.metaTemplateId}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 font-serif"
                        onClick={() => {
                          console.log("[v0] Preview button clicked for template:", template.name)
                          const templateWithChannel = { ...template, channel }
                          console.log("[v0] Setting preview template:", templateWithChannel)
                          setPreviewTemplate(templateWithChannel)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="gap-2 font-serif"
                            onClick={() => {
                              setEditingTemplate(template)
                              if (channel === "email") {
                                setEmailEditorOpen(true)
                              } else if (channel === "whatsapp") {
                                setWhatsappEditorOpen(true)
                              }
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            Edit Template
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 font-serif">
                            <Copy className="h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 font-serif">
                            <Eye className="h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 font-serif text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog
        open={!!previewTemplate}
        onOpenChange={(open) => {
          console.log("[v0] Dialog open state changed:", open)
          if (!open) setPreviewTemplate(null)
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-sans flex items-center gap-2">
              {previewTemplate?.channel === "email" ? (
                <Mail className="h-5 w-5" />
              ) : (
                <MessageSquare className="h-5 w-5" />
              )}
              Preview: {previewTemplate?.name}
            </DialogTitle>
            <DialogDescription className="font-serif">
              This is how your {previewTemplate?.channel} template will appear to recipients
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {previewTemplate && renderPreviewContent(previewTemplate, previewTemplate.channel)}
          </div>
        </DialogContent>
      </Dialog>

      <EmailTemplateEditor
        open={emailEditorOpen}
        onOpenChange={setEmailEditorOpen}
        template={editingTemplate}
        onSave={(template) => {
          console.log("[v0] Saving email template:", template)
          setEmailEditorOpen(false)
          setEditingTemplate(null)
        }}
      />

      <WhatsAppTemplateEditor
        open={whatsappEditorOpen}
        onOpenChange={setWhatsappEditorOpen}
        template={editingTemplate}
        onSave={(template) => {
          console.log("[v0] Saving WhatsApp template:", template)
          setWhatsappEditorOpen(false)
          setEditingTemplate(null)
        }}
      />
    </>
  )
}
