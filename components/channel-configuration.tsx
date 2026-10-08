"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Mail, MessageSquare, Smartphone, Bell, Save, TestTube, Eye } from "lucide-react"

export function ChannelConfiguration() {
  const [selectedChannel, setSelectedChannel] = useState("email")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Channel Configuration</CardTitle>
        <CardDescription className="font-serif">Configure settings for each communication channel</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedChannel} onValueChange={setSelectedChannel}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="email" className="gap-2 font-serif">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="gap-2 font-serif">
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="sms" className="gap-2 font-serif">
              <Smartphone className="h-4 w-4" />
              SMS
            </TabsTrigger>
            <TabsTrigger value="in-app" className="gap-2 font-serif">
              <Bell className="h-4 w-4" />
              In-App
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-serif">Provider</Label>
                  <Select defaultValue="sendgrid">
                    <SelectTrigger className="font-serif">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sendgrid" className="font-serif">
                        SendGrid
                      </SelectItem>
                      <SelectItem value="mailgun" className="font-serif">
                        Mailgun
                      </SelectItem>
                      <SelectItem value="ses" className="font-serif">
                        Amazon SES
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-serif">From Domain</Label>
                  <Input defaultValue="notifications.fitsol.com" className="font-serif" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-serif">API Key</Label>
                <Input type="password" defaultValue="sk_test_..." className="font-serif" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-serif">Enable DKIM Signing</Label>
                  <p className="text-xs text-muted-foreground font-serif">Improve email deliverability</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-serif">Track Opens</Label>
                  <p className="text-xs text-muted-foreground font-serif">Monitor email open rates</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-serif">Provider</Label>
                  <Select defaultValue="twilio">
                    <SelectTrigger className="font-serif">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio" className="font-serif">
                        Twilio
                      </SelectItem>
                      <SelectItem value="gupshup" className="font-serif">
                        Gupshup
                      </SelectItem>
                      <SelectItem value="360dialog" className="font-serif">
                        360Dialog
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-serif">Phone Number</Label>
                  <Input defaultValue="+1234567890" className="font-serif" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-serif">Access Token</Label>
                <Input type="password" defaultValue="EAAx..." className="font-serif" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-serif">Enable Rich Media</Label>
                  <p className="text-xs text-muted-foreground font-serif">Support images and documents</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-serif">Provider</Label>
                  <Select defaultValue="msg91">
                    <SelectTrigger className="font-serif">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="msg91" className="font-serif">
                        MSG91
                      </SelectItem>
                      <SelectItem value="twilio" className="font-serif">
                        Twilio
                      </SelectItem>
                      <SelectItem value="kaleyra" className="font-serif">
                        Kaleyra
                      </SelectItem>
                      <SelectItem value="gupshup" className="font-serif">
                        Gupshup
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-serif">Sender ID</Label>
                  <Input defaultValue="FITSOL" className="font-serif" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-serif">API Key</Label>
                <Input type="password" defaultValue="A1b2c3..." className="font-serif" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-serif">DLT Registration</Label>
                  <p className="text-xs text-muted-foreground font-serif">Required for India SMS</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="in-app" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="font-serif">WebSocket Endpoint</Label>
                <Input defaultValue="wss://api.fitsol.com/notifications" className="font-serif" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-serif">Enable Push Fallback</Label>
                  <p className="text-xs text-muted-foreground font-serif">Use browser push when offline</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-serif">Persist Notifications</Label>
                  <p className="text-xs text-muted-foreground font-serif">Store in notification center</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="flex items-center gap-3">
          <Button className="gap-2 font-serif">
            <Save className="h-4 w-4" />
            Save Configuration
          </Button>
          <Button variant="outline" className="gap-2 font-serif bg-transparent">
            <TestTube className="h-4 w-4" />
            Test Connection
          </Button>
          <Button variant="ghost" className="gap-2 font-serif">
            <Eye className="h-4 w-4" />
            View Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
