"use client";
import { usePathname, useRouter } from "next/navigation";
import { Zap, FolderOpen, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-60 min-h-screen bg-gray-950 border-r border-gray-800 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-800">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Zap className="w-3.5 h-3.5 text-white fill-white" />
        </div>
        <div>
          <span className="font-bold text-sm text-white">LuminarisCode</span>
          <p className="text-[10px] text-gray-600 -mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              pathname === href || pathname.startsWith(href)
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-600/30"
                : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/60"
            )}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
