import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: any }) {
  return (
    <div className="max-w-7xl justify-center mx-auto">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
