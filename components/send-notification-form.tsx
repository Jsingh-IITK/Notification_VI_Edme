import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageCircle, Send, Users } from "lucide-react"
import { getVariablesList } from "@/utils/variables"

export function SendNotificationForm() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Compose Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channel">Channel</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </SelectItem>
                <SelectItem value="whatsapp">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select contact list" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users (856 contacts)</SelectItem>
                <SelectItem value="newsletter">Newsletter (432 contacts)</SelectItem>
                <SelectItem value="premium">Premium (124 contacts)</SelectItem>
                <SelectItem value="vip">VIP (23 contacts)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Template (Optional)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template or write custom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Welcome Message</SelectItem>
                <SelectItem value="promotion">Promotion Alert</SelectItem>
                <SelectItem value="reminder">Cart Reminder</SelectItem>
                <SelectItem value="update">Product Update</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Enter message subject" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Write your message here..." className="min-h-[120px]" />
            <p className="text-xs text-muted-foreground">Use variables: {getVariablesList()}</p>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Send Now
            </Button>
            <Button variant="outline">Save Draft</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview & Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Email Preview</span>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>To:</strong> All Users (856 contacts)
              </p>
              <p>
                <strong>Subject:</strong> Your subject will appear here
              </p>
              <div className="mt-3 p-3 bg-background border rounded">
                <p className="text-muted-foreground italic">Your message preview will appear here...</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Delivery Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Recipients:</span>
                <Badge variant="secondary">856</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Estimated Delivery:</span>
                <span className="text-muted-foreground">~2 minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Channel:</span>
                <Badge>Email</Badge>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Quick Tip</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Test your message by sending to yourself first before sending to all contacts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
