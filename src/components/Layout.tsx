import CommandMenu from "./CommandMenu";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState } from "react";
import TopHeader from "./TopHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="flex min-h-screen">
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((v) => !v)} />
        <div className="flex-1 flex flex-col">
          <TopHeader />
          <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
            <div className="animate-fade-up">
              <div className="rounded-[2.5rem] bg-card/70 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 border border-border/60 shadow-sm transition-all duration-300">
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