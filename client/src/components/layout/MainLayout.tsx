import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer/Footer";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Content */}
        <div className="flex min-h-screen flex-1 flex-col lg:ml-64">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="flex-1 p-6 text-black transition-colors duration-300 dark:text-white">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;