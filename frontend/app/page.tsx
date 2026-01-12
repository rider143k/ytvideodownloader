import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Platforms from "@/components/Platforms";
import FAQ from "@/components/FAQ";


export default function HomePage() {
  return (
    <>
      
      <Hero />
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10 border"></div>
      <Features />
      <Platforms />
      <FAQ />
      
    </>
  );
}
