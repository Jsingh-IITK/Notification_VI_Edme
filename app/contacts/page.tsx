import { DashboardLayout } from "@/components/dashboard-layout"
import { ContactsList } from "@/components/contacts-list"
import { ContactsHeader } from "@/components/contacts-header"

export default function ContactsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <ContactsHeader />
        <ContactsList />
      </div>
    </DashboardLayout>
  )
}
