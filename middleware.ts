import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  console.log("Middleware executing for path:", request.nextUrl.pathname)

  try {
    const path = request.nextUrl.pathname

    // Define public paths that don't require authentication
    const isPublicPath = path === "/login" || path === "/register" || path === "/forgot-password"

    // Get the token
    console.log("Getting token from request")
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    console.log("Token exists:", !!token)

    // Redirect logic for authenticated users trying to access public paths
    if (isPublicPath && token) {
      console.log("Authenticated user trying to access public path")
      // Redirect based on user role
      if (token.role === "ADMIN") {
        console.log("Redirecting admin to admin dashboard")
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      } else {
        console.log("Redirecting client to client dashboard")
        return NextResponse.redirect(new URL("/client/dashboard", request.url))
      }
    }

    // Redirect logic for unauthenticated users trying to access protected paths
    if (!isPublicPath && !token) {
      console.log("Unauthenticated user trying to access protected path")
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Role-based access control
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      console.log("Non-admin user trying to access admin path")
      return NextResponse.redirect(new URL("/client/dashboard", request.url))
    }

    console.log("Middleware check passed, proceeding to next middleware or route handler")
    return NextResponse.next()
  } catch (error) {
    console.error("Error in middleware:", error)
    // In case of error, allow the request to proceed to the error page
    return NextResponse.next()
  }
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/login", "/register", "/forgot-password", "/admin/:path*", "/client/:path*"],
}

