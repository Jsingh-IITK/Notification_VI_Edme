"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Eye, Save, X } from "lucide-react"
import { getTemplateVariables } from "@/utils/variables"

interface EmailTemplateEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template?: any
  onSave: (template: any) => void
}

export function EmailTemplateEditor({ open, onOpenChange, template, onSave }: EmailTemplateEditorProps) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    category: "Transactional",
    description: "",
  })
  const [activeTab, setActiveTab] = useState("editor")

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || "",
        subject: template.subject || template.name || "",
        content: template.content || template.description || "",
        category: template.category || "Transactional",
        description: template.description || "",
      })
    } else {
      setFormData({
        name: "",
        subject: "",
        content: "",
        category: "Transactional",
        description: "",
      })
    }
  }, [template])

  const handleSave = () => {
    const templateData = {
      ...template,
      ...formData,
      id: template?.id || Date.now(),
      lastModified: "Just now",
      usage: template?.usage || 0,
      status: "active",
    }
    onSave(templateData)
  }

  const insertVariable = (variable: string) => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newContent = formData.content.substring(0, start) + `{{${variable}}}` + formData.content.substring(end)
      setFormData({ ...formData, content: newContent })

      // Restore cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + variable.length + 4, start + variable.length + 4)
      }, 0)
    }
  }

  const renderPreview = () => {
    let previewContent = formData.content
    const variables = getTemplateVariables()

    // Replace variables with sample data
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g")
      previewContent = previewContent.replace(regex, value)
    })

    return (
      <div className="border rounded-lg p-4 bg-white">
        <div className="border-b pb-3 mb-4">
          <div className="text-sm text-muted-foreground">From: noreply@fitsol.com</div>
          <div className="text-sm text-muted-foreground">To: john.doe@example.com</div>
          <div className="font-medium mt-1">Subject: {formData.subject.replace(/\{\{name\}\}/g, "John")}</div>
        </div>
        <div className="space-y-3">
          <div className="font-serif whitespace-pre-wrap">{previewContent}</div>
          <div className="pt-4 border-t text-sm text-muted-foreground">
            <p>
              Best regards,
              <br />
              The Fitsol Team
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-sans flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {template ? "Edit Email Template" : "Create Email Template"}
          </DialogTitle>
          <DialogDescription className="font-serif">
            {template
              ? "Update your email template content and settings"
              : "Create a new email template for your campaigns"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor" className="font-serif">
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="font-serif gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-serif">
                  Template Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Welcome Email"
                  className="font-serif"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="font-serif">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="font-serif">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Transactional">Transactional</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="font-serif">
                Email Subject
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g., Welcome to Fitsol, {{name}}!"
                className="font-serif"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-serif">
                Description
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this template"
                className="font-serif"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="content" className="font-serif">
                  Email Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your email content here..."
                  className="min-h-[300px] font-serif"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-serif">Available Variables</Label>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-sans">Click to Insert</CardTitle>
                    <CardDescription className="text-xs font-serif">
                      Variables will be replaced with actual data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.keys(getTemplateVariables()).map((variable) => (
                      <Button
                        key={variable}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs font-serif bg-transparent"
                        onClick={() => insertVariable(variable)}
                      >
                        {`{{${variable}}}`}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-serif">
                  Preview Mode
                </Badge>
                <span className="text-sm text-muted-foreground font-serif">
                  Variables are replaced with sample data
                </span>
              </div>
              {renderPreview()}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="font-serif">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="font-serif">
            <Save className="h-4 w-4 mr-2" />
            {template ? "Update Template" : "Create Template"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
