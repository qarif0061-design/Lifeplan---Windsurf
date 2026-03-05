import CommandMenu from "./CommandMenu";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState } from "react";
import TopHeader from "./TopHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex min-h-screen">
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((v) => !v)} />
        <div className="flex-1 flex flex-col">
          <TopHeader />
          <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
      <CommandMenu />
    </div>
  );
};

export default Layout;