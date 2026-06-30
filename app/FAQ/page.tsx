// app/faq/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/ui/FAQ";

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}