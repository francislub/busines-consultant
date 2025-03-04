import { DataTable } from "@/components/main/data-table"

export default function AppointmentsPage() {
  const appointments = [
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", date: "2023-06-15", time: "10:00 AM", status: "Scheduled" },
    {
      id: 2,
      patient: "Jane Smith",
      doctor: "Dr. Johnson",
      date: "2023-06-15",
      time: "11:30 AM",
      status: "In Progress",
    },
    { id: 3, patient: "Bob Brown", doctor: "Dr. Williams", date: "2023-06-15", time: "2:00 PM", status: "Completed" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Appointments</h1>
      <DataTable headers={["ID", "Patient", "Doctor", "Date", "Time", "Status"]} data={appointments} />
    </div>
  )
}

