"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// The studio's local time and whether it is open right now (Mon to Sat,
// 10:00 to 19:00 in Bombay). Without script it shows the opening hours.
function bombayNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hour = Number(get("hour"));
  const open = get("weekday") !== "Sun" && hour >= 10 && hour < 19;
  return { time: `${get("hour")}:${get("minute")}`, open };
}

export function LiveClock() {
  const [now, setNow] = useState<{ time: string; open: boolean } | null>(null);

  useEffect(() => {
    const tick = () => setNow(bombayNow());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <>{site.hours}</>;
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`size-2 rounded-full ${now.open ? "bg-taxi" : "bg-current opacity-40"}`} aria-hidden="true" />
      {now.time} in Bombay, {now.open ? "studio open" : "studio closed"}
    </span>
  );
}
