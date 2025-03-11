import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StoryCategory } from "@prisma/client"; // Import Prisma enum

// GET all stories with optional category filter
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // Define the where clause safely
    const where: { category?: StoryCategory } = {}; // Use Prisma enum type
    if (category && category !== "All") {
      const formattedCategory = category.toUpperCase().replace(/\s+/g, "_") as StoryCategory;
      if (Object.values(StoryCategory).includes(formattedCategory)) {
        where.category = formattedCategory;
      }
    }

    // Fetch stories from the database
    const stories = await prisma.story.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        category: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Ensure stories is always an array
    const formattedStories = (stories || []).map((story) => ({
      id: story.id,
      title: story.title,
      category: story.category.replace(/_/g, " "), // Convert back to readable format
      imageUrl: story.image,
      slug: story.slug,
      description: story.description,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
    }));

    return NextResponse.json(formattedStories);
  } catch (error) {
    console.error("❌ Error fetching stories:", error);
    return NextResponse.json(
      { message: "Internal server error" }, // ✅ Fixed syntax
      { status: 500 }
    );
  }
}
