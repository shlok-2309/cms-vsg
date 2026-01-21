import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

import Footer from "@/components/Footer";
import AdminNav from "@/components/admin/AdminNav";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  // No token → go to login
  if (!token) {
    redirect("/my-admin/login");
  }

  // Invalid / expired token → go to login
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    redirect("/my-admin/login");
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <AdminNav />

      <div className="flex">
        {/* Left Sidebar */}
        {/* <SideDrawer /> */}

        {/* Page Content */}
        <main className="flex-1 pt-10 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
