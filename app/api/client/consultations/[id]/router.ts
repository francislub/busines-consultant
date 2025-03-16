import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const consultationSchema = z.object({
  subject: z.string().min(1, "Subject is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .optional(),
  status: z.enum(["REQUESTED", "CONFIRMED", "COMPLETED", "CANCELLED"]).optional(),
})

// GET a specific consultation
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const consultation = await prisma.consultation.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!consultation) {
      return NextResponse.json({ message: "Consultation not found" }, { status: 404 })
    }

    // Only allow the client who created the consultation or an admin to view it
    if (consultation.clientId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(consultation)
  } catch (error) {
    console.error("Error fetching consultation:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// PUT (update) a consultation
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const consultation = await prisma.consultation.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!consultation) {
      return NextResponse.json({ message: "Consultation not found" }, { status: 404 })
    }

    // Only allow the client who created the consultation or an admin to update it
    if (consultation.clientId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { subject, description, date, status } = consultationSchema.parse(body)

    // Update consultation
    const updatedConsultation = await prisma.consultation.update({
      where: {
        id: params.id,
      },
      data: {
        ...(subject && { subject }),
        ...(description && { description }),
        ...(date && { date: new Date(date) }),
        ...(status && { status }),
      },
    })

    return NextResponse.json(updatedConsultation)
  } catch (error) {
    console.error("Error updating consultation:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// DELETE a consultation
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const consultation = await prisma.consultation.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!consultation) {
      return NextResponse.json({ message: "Consultation not found" }, { status: 404 })
    }

    // Only allow the client who created the consultation or an admin to delete it
    if (consultation.clientId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Delete consultation
    await prisma.consultation.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Consultation deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting consultation:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

