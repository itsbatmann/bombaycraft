import { Hero } from "@/components/Hero";
import { Bombay } from "@/components/sections/Bombay";
import { Brief } from "@/components/sections/Brief";
import { Crafts } from "@/components/sections/Crafts";
import { Figure } from "@/components/sections/Figure";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Crafts />
      <Process />
      <Figure />
      <Bombay />
      <Brief />
    </>
  );
}
