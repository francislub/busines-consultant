import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Mock function to get the current user ID (in a real app, this would come from auth)
const getCurrentUserId = () => {
  // This is a placeholder - in a real app, you'd get this from the session
  return "user_id_here"
}

export async function GET() {
  try {
    const userId = getCurrentUserId()

    // In a real app, you'd use the actual user ID from the session
    // For demo purposes, we'll get the first admin user
    const user = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Don't return the password
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Failed to fetch user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { name, email, image } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
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

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        email,
        image,
      },
    })

    // Don't return the password
    const { password, ...userWithoutPassword } = updatedUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Failed to update user profile:", error)
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
  }
}

