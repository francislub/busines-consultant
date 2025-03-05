import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        title: true,
        description: true,
        image: true,
        linkedin: true,
        email: true,
      },
    })

    return NextResponse.json(teams)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { name, title, description, image, linkedin, email } = body

    const team = await prisma.team.create({
      data: {
        name,
        title,
        description,
        image,
        linkedin,
        email,
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
    })

    return NextResponse.json(team, { status: 201 })
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

