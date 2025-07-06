import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path ==="/login"||path === "/signup"||path==="/verifyemail"

    const token = request.cookies.get("token")?.value
console.log(token);

    if(isPublicPath&&token)
  return NextResponse.redirect(new URL('/', request.url))
    if(!isPublicPath&&!token)
  return NextResponse.redirect(new URL('/login', request.url))


}
 
export const config = {
  matcher: ['/','/login',"/signup","/profile","/verifyemail"],
}