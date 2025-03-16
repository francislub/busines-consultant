import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const team = await prisma.team.findUnique({
      where: {
        id: params.id, 
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
    });

    if (!team) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team member:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
