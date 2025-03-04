import React from "react"

import { DataTable } from "@/components/main/data-table"

export default function UsersPage() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Patient" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
    { id: 3, name: "Bob Brown", email: "bob@example.com", role: "Patient" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users</h1>
      <DataTable headers={["ID", "Name", "Email", "Role"]} data={users} />
    </div>
  )
}

