import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  User,
  Wallet,
  Bot,
} from "lucide-react";
import {
  Settings,
} from "lucide-react";


interface Props {
  open: boolean;
  onClose: () => void;
}

function Sidebar({ open, onClose }: Props) {
  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: Receipt,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Budget",
      path: "/budget",
      icon: Wallet,
    },
    {
  name: "AI Assistant",
  path: "/ai-chat",
  icon: Bot,
},
{
  name: "Settings",
  path: "/settings",
  icon: Settings,
},

  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed inset-y-0 left-0 z-50
    w-64
    bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
    text-white shadow-2xl
    transform transition-transform duration-300 ease-in-out
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
      >
        <div className="p-6 flex h-full flex-col">
          <div className="mb-8 border-b border-slate-700 pb-6">
            <h2 className="text-2x2 font-bold text-white">
              💰 AI Expense Tracker
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Smart Finance Dashboard
            </p>
          </div>

          <nav className="flex-1 space-y-3">
            {links.map((link) => {
              const Icon = link.icon;

              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
        ${
          isActive
            ? "bg-blue-600 text-white shadow-lg border-l-4 border-cyan-300"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`}
                >
                  <Icon size={20} />

                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}

            
          </nav>
          <div className="mt-10 border-t border-slate-700 pt-6">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm font-semibold text-white">
                AI Expense Tracker
              </p>

              <p className="mt-1 text-xs text-slate-400">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
