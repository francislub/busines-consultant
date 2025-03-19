import { NextResponse } from "next/server"

// This is a mock API since we don't have a notifications table in the schema
// In a real app, you would store these preferences in the database

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { emailNotifications, commentNotifications, messageNotifications, securityAlerts } = body

    // In a real app, you would save these preferences to the database
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      preferences: {
        emailNotifications,
        commentNotifications,
        messageNotifications,
        securityAlerts,
      },
    })
  } catch (error) {
    console.error("Failed to update notification settings:", error)
    return NextResponse.json({ error: "Failed to update notification settings" }, { status: 500 })
  }
}

