"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Save, X, Plus } from "lucide-react"

interface WhatsAppTemplateEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template?: any
  onSave: (template: any) => void
}

export function WhatsAppTemplateEditor({ open, onOpenChange, template, onSave }: WhatsAppTemplateEditorProps) {
  const [formData, setFormData] = useState({
    name: "",
    metaTemplateId: "",
    description: "",
    category: "Transactional",
    language: "en",
    status: "draft",
  })

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || "",
        metaTemplateId: template.metaTemplateId || "",
        description: template.description || "",
        category: template.category || "Transactional",
        language: template.language || "en",
        status: template.status || "draft",
      })
    } else {
      setFormData({
        name: "",
        metaTemplateId: "",
        description: "",
        category: "Transactional",
        language: "en",
        status: "draft",
      })
    }
  }, [template])

  const handleSave = () => {
    onSave(formData)
  }

  const insertVariable = (variableNumber: string) => {
    const textarea = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      const before = text.substring(0, start)
      const after = text.substring(end, text.length)
      const newText = before + `{{${variableNumber}}}` + after
      setFormData((prev) => ({ ...prev, description: newText }))

      // Set cursor position after the inserted variable
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + variableNumber.length + 4, start + variableNumber.length + 4)
      }, 0)
    }
  }

  const renderPreview = () => {
    let previewText = formData.description
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
            <p className="font-serif text-sm">{previewText || "Your message will appear here..."}</p>
            <div className="text-xs text-muted-foreground mt-2">12:34 PM ✓✓</div>
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
            <MessageSquare className="h-5 w-5" />
            {template ? "Edit WhatsApp Template" : "Add Meta-Approved WhatsApp Template"}
          </DialogTitle>
          <DialogDescription className="font-serif">
            Add a WhatsApp template that has already been approved by Meta
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor" className="font-serif">
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="font-serif">
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., order_confirmation"
                  className="font-serif"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaTemplateId" className="font-serif">
                  Meta Template ID
                </Label>
                <Input
                  id="metaTemplateId"
                  value={formData.metaTemplateId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, metaTemplateId: e.target.value }))}
                  placeholder="e.g., order_confirmation_v2"
                  className="font-serif"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="font-serif">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="font-serif">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Transactional" className="font-serif">
                      Transactional
                    </SelectItem>
                    <SelectItem value="Marketing" className="font-serif">
                      Marketing
                    </SelectItem>
                    <SelectItem value="Onboarding" className="font-serif">
                      Onboarding
                    </SelectItem>
                    <SelectItem value="Support" className="font-serif">
                      Support
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language" className="font-serif">
                  Language
                </Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger className="font-serif">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en" className="font-serif">
                      English
                    </SelectItem>
                    <SelectItem value="es" className="font-serif">
                      Spanish
                    </SelectItem>
                    <SelectItem value="fr" className="font-serif">
                      French
                    </SelectItem>
                    <SelectItem value="hi" className="font-serif">
                      Hindi
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-serif">
                Message Content
              </Label>
              <div className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable("1")}
                    className="font-serif text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {"{{1}}"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable("2")}
                    className="font-serif text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {"{{2}}"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable("3")}
                    className="font-serif text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {"{{3}}"}
                  </Button>
                </div>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Hi {{1}}, your order {{2}} is confirmed and will be delivered by {{3}}."
                  className="min-h-[120px] font-serif"
                />
                <p className="text-xs text-muted-foreground font-serif">
                  Use numbered variables like {"{{1}}"}, {"{{2}}"}, {"{{3}}"} as approved by Meta
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-serif">Status</Label>
              <div className="flex gap-2">
                <Badge variant={formData.status === "meta_approved" ? "default" : "secondary"} className="font-serif">
                  {formData.status === "meta_approved" ? "Meta Approved" : "Draft"}
                </Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium font-sans mb-2">WhatsApp Preview</h3>
                <p className="text-sm text-muted-foreground font-serif mb-4">
                  This is how your message will appear to recipients
                </p>
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
            Save Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
