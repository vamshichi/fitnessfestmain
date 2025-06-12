  import { NextResponse } from "next/server"
  import type { NextRequest } from "next/server"

  // Simple middleware without JWT verification for now
  export async function middleware(request: NextRequest) {
    // Check if the request is for an admin route
    if (request.nextUrl.pathname.startsWith("/admin")) {
      // Get the token from the cookies
      const token = request.cookies.get("auth_token")?.value

      // If there's no token, redirect to login
      if (!token) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("from", request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }

      // For now, just check if token exists (we'll add proper verification later)
      // This prevents the middleware from failing due to missing dependencies
      if (!token || token.length < 10) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("from", request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }
    }

    // Add CORS headers for nominations API
    if (request.nextUrl.pathname.startsWith("/api/nominations")) {
      const response = NextResponse.next()
      response.headers.set("Access-Control-Allow-Origin", "*")
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
      return response
    }

    return NextResponse.next()
  }

  export const config = {
    matcher: ["/admin/:path*", "/api/nominations/:path*"],
  }
