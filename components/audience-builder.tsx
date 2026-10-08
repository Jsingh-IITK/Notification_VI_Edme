"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Target, Users, Save, Eye, X } from "lucide-react"

const conditions = [
  { field: "user.signup_date", operator: "is_after", value: "30 days ago" },
  { field: "user.last_login", operator: "is_before", value: "60 days ago" },
  { field: "order.total_value", operator: "is_greater_than", value: "500" },
]

const availableFields = [
  { value: "user.signup_date", label: "Signup Date", type: "date" },
  { value: "user.last_login", label: "Last Login", type: "date" },
  { value: "user.email_verified", label: "Email Verified", type: "boolean" },
  { value: "user.subscription_status", label: "Subscription Status", type: "select" },
  { value: "order.total_value", label: "Total Order Value", type: "number" },
  { value: "order.count", label: "Order Count", type: "number" },
  { value: "product.category", label: "Product Category", type: "select" },
]

const operators = {
  date: ["is_after", "is_before", "is_between"],
  number: ["is_equal_to", "is_greater_than", "is_less_than", "is_between"],
  boolean: ["is_true", "is_false"],
  select: ["is", "is_not", "contains"],
}

export function AudienceBuilder() {
  const [audienceType, setAudienceType] = useState("dynamic")
  const [audienceName, setAudienceName] = useState("")
  const [selectedConditions, setSelectedConditions] = useState(conditions)

  const addCondition = () => {
    setSelectedConditions([...selectedConditions, { field: "", operator: "", value: "" }])
  }

  const removeCondition = (index: number) => {
    setSelectedConditions(selectedConditions.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans flex items-center gap-2">
          <Target className="h-5 w-5" />
          Audience Builder
        </CardTitle>
        <CardDescription className="font-serif">Create targeted customer segments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Audience Type */}
        <Tabs value={audienceType} onValueChange={setAudienceType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dynamic" className="gap-2 font-serif">
              <Target className="h-4 w-4" />
              Dynamic
            </TabsTrigger>
            <TabsTrigger value="static" className="gap-2 font-serif">
              <Users className="h-4 w-4" />
              Static
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dynamic" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="audience-name" className="font-serif">
                Audience Name
              </Label>
              <Input
                id="audience-name"
                placeholder="e.g., High-Value Customers"
                value={audienceName}
                onChange={(e) => setAudienceName(e.target.value)}
                className="font-serif"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-serif">Conditions</Label>
                <Button variant="outline" size="sm" onClick={addCondition} className="gap-2 font-serif bg-transparent">
                  <Plus className="h-4 w-4" />
                  Add Condition
                </Button>
              </div>

              <div className="space-y-3">
                {selectedConditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg border">
                    <Select value={condition.field}>
                      <SelectTrigger className="flex-1 font-serif">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFields.map((field) => (
                          <SelectItem key={field.value} value={field.value} className="font-serif">
                            {field.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={condition.operator}>
                      <SelectTrigger className="flex-1 font-serif">
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="is_greater_than" className="font-serif">
                          is greater than
                        </SelectItem>
                        <SelectItem value="is_less_than" className="font-serif">
                          is less than
                        </SelectItem>
                        <SelectItem value="is_equal_to" className="font-serif">
                          is equal to
                        </SelectItem>
                        <SelectItem value="is_after" className="font-serif">
                          is after
                        </SelectItem>
                        <SelectItem value="is_before" className="font-serif">
                          is before
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Input placeholder="Value" value={condition.value} className="flex-1 font-serif" />

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCondition(index)}
                      className="text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {selectedConditions.length > 0 && (
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm font-medium font-serif">Preview</p>
                  <p className="text-xs text-muted-foreground font-serif mt-1">
                    Estimated audience size: ~2,847 contacts
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs font-serif">
                      Updates automatically
                    </Badge>
                    <Badge variant="outline" className="text-xs font-serif">
                      Real-time sync
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="static" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="static-audience-name" className="font-serif">
                Audience Name
              </Label>
              <Input id="static-audience-name" placeholder="e.g., Beta Testers" className="font-serif" />
            </div>

            <div className="space-y-2">
              <Label className="font-serif">Upload Method</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="gap-2 font-serif bg-transparent">
                  <Plus className="h-4 w-4" />
                  Upload CSV
                </Button>
                <Button variant="outline" className="gap-2 font-serif bg-transparent">
                  <Plus className="h-4 w-4" />
                  Manual Entry
                </Button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted">
              <p className="text-sm font-medium font-serif">Static Audience</p>
              <p className="text-xs text-muted-foreground font-serif mt-1">Fixed list that requires manual updates</p>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button className="gap-2 font-serif">
            <Save className="h-4 w-4" />
            Save Audience
          </Button>
          <Button variant="outline" className="gap-2 font-serif bg-transparent">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
