function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-blue-600">
        AI Expense Tracker
      </h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Login
      </button>
    </header>
  );
}

export default Navbar;