import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        articles: {
          select: {
            id: true,
            title: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Don't return passwords
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return NextResponse.json(usersWithoutPasswords)
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, image, role } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image,
        role: role || "CLIENT",
      },
      include: {
        articles: {
          select: {
            id: true,
            title: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
          },
        },
      },
    })

    // Don't return the password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Failed to create user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, email, password, image, role } = body

    if (!id || !name || !email) {
      return NextResponse.json({ error: "ID, name, and email are required" }, { status: 400 })
    }

    // Check if another user with the same email exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser && existingUser.id !== id) {
      return NextResponse.json({ error: "Another user with this email already exists" }, { status: 400 })
    }

    // Prepare update data
    const updateData: any = {
      name,
      email,
      image,
      role,
    }

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        articles: {
          select: {
            id: true,
            title: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
          },
        },
      },
    })

    // Don't return the password
    const { password: _, ...userWithoutPassword } = updatedUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Failed to update user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Delete user's comments
    await prisma.comment.deleteMany({
      where: { authorId: id },
    })

    // Delete user's articles
    await prisma.article.deleteMany({
      where: { authorId: id },
    })

    // Delete user's stories
    await prisma.story.deleteMany({
      where: { authorId: id },
    })

    // Delete user's teams
    await prisma.team.deleteMany({
      where: { authorId: id },
    })

    // Delete user's inquiries
    await prisma.inquiry.deleteMany({
      where: { userId: id },
    })

    // Delete user's messages
    await prisma.message.deleteMany({
      where: { senderId: id },
    })

    // Delete user's consultations
    await prisma.consultation.deleteMany({
      where: { clientId: id },
    })

    // Finally, delete the user
    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}

