import { Link, useLocation } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

function Sidebar({ open, onClose }: Props) {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Expenses", path: "/expenses" },
    { name: "Profile", path: "/profile" },
    { name: "Budget", path: "/budget" },
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
          fixed top-0 left-0 z-50 h-screen w-64
          bg-slate-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shrink-0
        `}
      >
        <div className="p-6">
          <h2 className="mb-8 text-2xl font-bold">
            Dashboard
          </h2>

          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`block rounded-lg px-4 py-3 transition
                  ${
                    location.pathname === link.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;