import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextUrl.pathname);
    // console.log(req.nextauth.token.role);
    // if (
    //   req.nextUrl.pathname.startsWith("/dashboard/addStudent") &&
    //   req.nextauth.token.role !== "admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/denied", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
      signUp: "auth/register",
      error: "/error",
    },
  }
);
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/notice",
    "/dashboard/addStudent",
    "/dashboard/activities",
    "/dashboard/deleteStudent",
    "/dashboard/editStudent",
    "/dashboard/finances",
    "/dashboard/news",
    "/dashboard/allStudents",
  ],
};
