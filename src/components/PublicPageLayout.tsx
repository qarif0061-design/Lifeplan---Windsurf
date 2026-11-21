import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BoostLinks from "@/components/BoostLinks";

const PublicPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12">
        {children}
        <BoostLinks />
      </main>
      <Footer />
    </div>
  );
};

export default PublicPageLayout;
