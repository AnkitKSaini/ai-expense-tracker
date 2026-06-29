import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">
        Dashboard
      </h2>

      <nav className="space-y-4">
        <Link className="block hover:text-blue-400" to="/">
          Dashboard
        </Link>

        <Link className="block hover:text-blue-400" to="/expenses">
          Expenses
        </Link>

        <Link className="block hover:text-blue-400" to="/profile">
          Profile
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;