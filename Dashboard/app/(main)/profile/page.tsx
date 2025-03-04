"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Profile() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically update the user's profile
    alert("Profile updated successfully!")
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-[600px] mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <Button className="mt-4" type="submit">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

