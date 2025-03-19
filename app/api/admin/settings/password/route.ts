import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

// Mock function to get the current user
const getCurrentUserId = () => {
  // This is a placeholder - in a real app, you'd get this from the session
  return "user_id_here"
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 })
    }

    // In a real app, you'd use the actual user ID from the session
    // For demo purposes, we'll update the first admin user
    const user = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update the password
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update password:", error)
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
  }
}

