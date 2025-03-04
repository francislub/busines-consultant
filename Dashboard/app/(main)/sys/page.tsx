import { Users, UserIcon as UserMd, FileText, Calendar } from "lucide-react"

import { DataTable } from "@/components/main/data-table"
import { StatCard } from "@/components/main/stat-card"

export default function Dashboard() {
  // This data would typically come from an API or database
  const stats = [
    { title: "Total Patients", value: 1234, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: "Doctors", value: 56, icon: <UserMd className="h-4 w-4 text-muted-foreground" /> },
    { title: "Pending Invoices", value: 23, icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
    { title: "Appointments Today", value: 45, icon: <Calendar className="h-4 w-4 text-muted-foreground" /> },
  ]

  const recentAppointments = [
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", date: "2023-06-15", time: "10:00 AM" },
    { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", date: "2023-06-15", time: "11:30 AM" },
    { id: 3, patient: "Bob Brown", doctor: "Dr. Williams", date: "2023-06-15", time: "2:00 PM" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Appointments</h2>
        <DataTable headers={["ID", "Patient", "Doctor", "Date", "Time"]} data={recentAppointments} />
      </div>
    </div>
  )
}

