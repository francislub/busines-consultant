import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const updateContactSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]).optional(),
  notes: z.string().optional(),
})

// GET a specific contact
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const contact = await prisma.contact.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// PATCH (update) a contact
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { status } = updateContactSchema.parse(body)

    // Check if contact exists
    const existingContact = await prisma.contact.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingContact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 })
    }

    // Update contact
    const updatedContact = await prisma.contact.update({
      where: {
        id: params.id,
      },
      data: {
        ...(status && { status }),
      },
    })

    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error("Error updating contact:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// DELETE a contact
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Check if contact exists
    const existingContact = await prisma.contact.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingContact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 })
    }

    // Delete contact
    await prisma.contact.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Contact deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

