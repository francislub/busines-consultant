import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import prisma from "@/lib/prisma"
import { z } from "zod"

const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["ADMIN", "CLIENT"], {
    required_error: "Please select a role",
  }),
})

export async function POST(req: Request) {
  console.log("Register API route called")

  try {
    // Parse request body
    const body = await req.json()
    console.log("Request body received:", { ...body, password: "[REDACTED]" })

    // Validate input data
    const validationResult = userSchema.safeParse(body)

    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error.format())
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      )
    }

    const { name, email, password, role } = validationResult.data
    console.log("Validated data:", { name, email, role, password: "[REDACTED]" })

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Hash password
    console.log("Hashing password")
    const hashedPassword = await hash(password, 10)

    // Create user
    console.log("Creating user in database")
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    console.log("User created successfully:", user.id)

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { user: userWithoutPassword, message: "User registered successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error in API route:", error)

    // Ensure we always return a proper JSON response
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid data", errors: error.errors },
        { status: 400 }
      )
    }

    // Handle any other errors
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
