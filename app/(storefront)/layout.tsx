import { Footer } from "../components/storefront/Footer";
import { Navbar } from "../components/storefront/Navbar";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
}
