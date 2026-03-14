import Navbar from "@/components/Navbar";

const PublicPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12">{children}</main>
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2024 LifePlan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicPageLayout;
