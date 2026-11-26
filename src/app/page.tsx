import { Contact } from "@/components/Contact";
import { Dive } from "@/components/Dive";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PageMotion } from "@/components/PageMotion";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Statement } from "@/components/Statement";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Work />
      <Dive />
      <Services />
      <Process />
      <Contact />
      <Footer />
      <PageMotion />
    </>
  );
}
