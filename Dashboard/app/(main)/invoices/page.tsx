import { DataTable } from "@/components/main/data-table"

export default function InvoicesPage() {
  const invoices = [
    { id: 1, patient: "John Doe", amount: "$500", status: "Paid", date: "2023-06-10" },
    { id: 2, patient: "Jane Smith", amount: "$750", status: "Pending", date: "2023-06-12" },
    { id: 3, patient: "Bob Brown", amount: "$300", status: "Overdue", date: "2023-06-08" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Invoices & Receipts</h1>
      <DataTable headers={["ID", "Patient", "Amount", "Status", "Date"]} data={invoices} />
    </div>
  )
}

