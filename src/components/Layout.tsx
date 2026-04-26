import CommandMenu from "./CommandMenu";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState } from "react";
import TopHeader from "./TopHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((v) => !v)} />
        <div className="flex-1 flex flex-col">
          <TopHeader />
          <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="rounded-[2.5rem] bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-white/40 shadow-sm">
                <div className="p-6 sm:p-8">
                  {children}
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
      <CommandMenu />
    </div>
  );
};

export default Layout;