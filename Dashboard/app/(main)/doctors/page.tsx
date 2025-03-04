import { DataTable } from "@/components/main/data-table"

export default function DoctorsPage() {
  const doctors = [
    { id: 1, name: "Dr. Smith", specialization: "Cardiology", patients: 120 },
    { id: 2, name: "Dr. Johnson", specialization: "Pediatrics", patients: 85 },
    { id: 3, name: "Dr. Williams", specialization: "Neurology", patients: 95 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Doctors</h1>
      <DataTable headers={["ID", "Name", "Specialization", "Patients"]} data={doctors} />
    </div>
  )
}

