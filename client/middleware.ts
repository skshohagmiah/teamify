 import authConfig from "./auth.config"
 import NextAuth from "next-auth"
 import { NextResponse } from "next/server"
 export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  // req.auth
  const isAuthenticated = req.auth?.user
  if(!isAuthenticated){
   return NextResponse.rewrite((new URL('/',req.url)))
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}