import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Failed to fetch contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, company, website, city, state, message } = body

    if (!firstName || !lastName || !email || !phone || !company || !city || !state || !message) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    const newContact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        website,
        city,
        state,
        message,
        status: "NEW",
      },
    })

    return NextResponse.json(newContact)
  } catch (error) {
    console.error("Failed to create contact:", error)
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, firstName, lastName, email, phone, company, website, city, state, message, status } = body

    if (!id || !firstName || !lastName || !email || !phone || !company || !city || !state || !message) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        website,
        city,
        state,
        message,
        status: status || "NEW",
      },
    })

    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error("Failed to update contact:", error)
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: "Contact ID and status are required" }, { status: 400 })
    }

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        status,
      },
    })

    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error("Failed to update contact status:", error)
    return NextResponse.json({ error: "Failed to update contact status" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 })
    }

    await prisma.contact.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete contact:", error)
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 })
  }
}

