import { Hero } from "@/components/Hero";
import { Atelier } from "@/components/sections/Atelier";
import { Numbers } from "@/components/sections/Numbers";
import { Stranger } from "@/components/sections/Stranger";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WorkBento } from "@/components/sections/WorkBento";

export default function Home() {
  return (
    <>
      <Hero nextId="work" />
      <WorkBento />
      <WhatWeDo />
      <Numbers />
      <Atelier />
      <Stranger />
    </>
  );
}
