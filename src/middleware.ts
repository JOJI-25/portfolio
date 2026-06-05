import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // Requires the user to be logged in
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    // Protect everything under /admin except the login page itself
    "/admin/((?!login).*)",
  ],
};
