import Aitools from "@/components/Aitools";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Plan from "@/components/Plan";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Aitools />
      <Testimonials />
      <Plan />
      <Footer />
    </div>
  );
}
