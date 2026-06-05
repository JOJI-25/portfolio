"use client";

import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, FolderKanban, Route, Award, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  if (pathname === "/admin/login") {
    return <SessionProvider>{children}</SessionProvider>;
  }

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Roadmap", href: "/admin/roadmap", icon: Route },
    { name: "Certifications", href: "/admin/certifications", icon: Award },
    { name: "Personal Info", href: "/admin/profile", icon: UserCircle },
  ];

  return (
    <SessionProvider>
      <div className="min-h-screen bg-bg-primary text-text-primary flex">
        {/* Sidebar */}
        <aside className="w-64 bg-bg-secondary border-r border-border flex flex-col hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-border">
            <span className="text-lg font-bold text-accent-primary">Portfolio Admin</span>
          </div>
          
          <nav className="flex-1 py-6 px-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                    isActive 
                      ? "bg-accent-primary/10 text-accent-primary font-medium" 
                      : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-border">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center w-full px-3 py-2 text-text-secondary hover:text-accent-primary transition-colors rounded-md"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <header className="h-16 bg-bg-secondary border-b border-border flex items-center justify-between px-6 md:hidden">
            <span className="text-lg font-bold text-accent-primary">Admin</span>
            <button onClick={() => signOut()} className="text-text-secondary">
              <LogOut className="w-5 h-5" />
            </button>
          </header>
          
          <div className="p-8 flex-1 overflow-auto bg-bg-primary">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
