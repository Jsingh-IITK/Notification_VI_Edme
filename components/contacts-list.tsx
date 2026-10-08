import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, MoreHorizontal } from "lucide-react"

export function ContactsList() {
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      status: "active",
      lists: ["All Users", "Newsletter"],
      lastContact: "2 days ago",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+91 87654 32109",
      status: "active",
      lists: ["All Users", "Premium"],
      lastContact: "1 week ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 76543 21098",
      status: "inactive",
      lists: ["All Users"],
      lastContact: "1 month ago",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">743</div>
            <p className="text-xs text-muted-foreground">87% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contact Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">All Users, Newsletter, Premium, VIP</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {contact.email}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="mr-1 h-3 w-3" />
                        {contact.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex space-x-1 mb-1">
                      {contact.lists.map((list) => (
                        <Badge key={list} variant="secondary" className="text-xs">
                          {list}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Last: {contact.lastContact}</p>
                  </div>

                  <Badge variant={contact.status === "active" ? "default" : "secondary"}>{contact.status}</Badge>

                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
