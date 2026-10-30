import { Opening } from "@/components/Opening";
import { Glossary } from "@/components/sections/Glossary";
import { Manifesto } from "@/components/sections/Manifesto";
import { Marquee } from "@/components/sections/Marquee";
import { NowShowing } from "@/components/sections/NowShowing";
import { Scenes } from "@/components/sections/Scenes";
import { Ticket } from "@/components/sections/Ticket";

export default function Home() {
  return (
    <>
      <Opening />
      <Manifesto />
      <NowShowing />
      <Marquee />
      <Scenes />
      <Glossary />
      <Ticket label="V — Admit one" />
    </>
  );
}
