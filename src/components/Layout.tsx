import Navbar from "./Navbar";
import { MadeWithDyad } from "./made-with-dyad";
import CommandMenu from "./CommandMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {children}
      </main>
      <CommandMenu />
      <MadeWithDyad />
    </div>
  );
};

export default Layout;