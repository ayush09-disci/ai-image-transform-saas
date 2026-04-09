import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoutes = createRouteMatcher([
    "/sign-in",
    "sign-up",
    "/",
    "/home"
])

const isPublicApiRoutes = createRouteMatcher([
    "/api/videos"
])

export default clerkMiddleware((auth,req)=>{
    const {userId} = auth();
    const currentUrl = new URL(req.url);

    const isAccessingHome = (currentUrl.pathname === "/home")
    const isApiRoute = (currentUrl.pathname.startsWith("/api"))

    //if user logged in  tryong to acces the public route
    if(userId && isPublicRoutes(req) && !isAccessingHome){
        return NextResponse.redirect(new URL("/home",req.url))
    }

    //if user is not logged in
    if(!userId){
        if(!isPublicApiRoutes(req) && !isPublicRoutes(req)){
            return NextResponse.redirect(new URL("/sign-in",req.url))
        }
        
        if(isApiRoute && !isPublicApiRoutes(req)){
            return NextResponse.redirect(new URL("/sign-in",req.url))
        }
    }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};