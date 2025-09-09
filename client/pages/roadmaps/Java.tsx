import React, { useEffect, useMemo, useRef, useState } from "react";

// Data structure for the roadmap
 type Section = {
  step: "Basic" | "Intermediate" | "Advanced";
  title: string;
  items: string[];
};

const sections: Section[] = [
  { step: "Basic", title: "Introduction", items: ["Java Intro","Java Get Started","Java Syntax","Java Output","Java Comments"] },
  { step: "Basic", title: "Variables & Data Types", items: ["Java Variables","Java Data Types","Java Type Casting"] },
  { step: "Basic", title: "Operators & Strings", items: ["Java Operators","Java Strings","Java Math","Java Booleans"] },
  { step: "Basic", title: "Control Flow", items: ["Java Conditions (if-else)","Java Switch","Java While Loop","Java For Loop","Java Break/Continue"] },
  { step: "Basic", title: "Arrays & Methods", items: ["Java Arrays","Java Methods","Java Method Parameters","Java Method Overloading","Java Scope","Java Recursion"] },
  { step: "Intermediate", title: "Object-Oriented Programming", items: [
    "Java OOP Concepts","Java Classes/Objects","Java Class Attributes & Methods","Java Constructors","Java this Keyword","Java Modifiers","Java Encapsulation","Java Packages / API","Java Inheritance","Java Polymorphism","Java super Keyword","Java Inner Classes","Java Abstraction","Java Interface","Java Enums",
  ] },
  { step: "Intermediate", title: "Error Handling", items: ["Java Errors","Java Debugging","Exceptions (try-catch-finally, throw, throws)"] },
  { step: "Intermediate", title: "File Handling", items: ["Java Files","Java Create/Write Files","Java Read Files","Java Delete Files"] },
  { step: "Intermediate", title: "Data Structures & Collections", items: [
    "Java Data Structures","Java Collections Framework","Java List / ArrayList / LinkedList","Java List Sorting","Java Set / HashSet / TreeSet / LinkedHashSet","Java Map / HashMap / TreeMap / LinkedHashMap","Java Iterator",
  ] },
  { step: "Intermediate", title: "Advanced Java Concepts", items: [
    "Java Wrapper Classes","Java Generics","Java Annotations","Java Threads (Multithreading)","Java RegEx","Java Lambda Expressions","Java Advanced Sorting",
  ] },
  { step: "Advanced", title: "Spring Boot Introduction", items: ["Introduction","Spring vs Spring Boot","Spring MVC vs Spring Boot"] },
  { step: "Advanced", title: "Spring Core Concepts", items: [
    "Inversion of Control","Dependency Injection","BeanFactory vs. ApplicationContext","Spring Bean Lifecycle","Singleton, Prototype Scope","Custom Scope","Create a Spring Bean","Spring Autowiring","DispatcherServlet","Spring IoC Container","Maven/Gradle","Spring Boot Core Features",
  ] },
  { step: "Advanced", title: "Architecture & Configuration", items: [
    "Annotations","Auto-configuration","Spring Boot Starters","Create a basic application","Best Practices","Application Properties","YAML Configuration","Actuator","Logging","DevTools",
  ] },
  { step: "Advanced", title: "REST API with Spring Boot", items: [
    "@RestController","@RequestMapping","@GetMapping & @PostMapping","@PutMapping & @DeleteMapping","@PathVariable & @RequestParam","@RequestBody","REST API JSON Serialization/Deserialization","Exception Handling","Validation",
  ] },
  { step: "Advanced", title: "Database & JPA Integration", items: [
    "Integrating with MySQL","PostgreSQL","MongoDB","Spring Data JPA","Hibernate Basics","JDBC","CrudRepository vs. JpaRepository","H2 Database for Testing","CRUD Operations with JPA Repositories",
  ] },
  { step: "Advanced", title: "Advanced Spring Boot Features", items: [
    "Scheduling Tasks","Sending Emails","File Handling & Uploading Files","Caching","Caching with other Providers","Transaction Management","DTO Mapping",
  ] },
  { step: "Advanced", title: "Microservices with Spring Boot", items: ["Introduction","Communication Between Spring Microservices","Deploy Java Microservices on AWS Elastic Beanstalk"] },
  { step: "Advanced", title: "Spring Boot Testing", items: ["Unit Testing with JUnit","Testing with Mockito","Integration Testing with MockMVC","Using ZeroCode for Testing"] },
];

 type Marker = {
  id: string;
  label: string;
  step: "Basic" | "Intermediate" | "Advanced";
  items: string[];
  t: number; // normalized 0..1 along the path
};

// Match project sky/cyan scheme
 const stepColor: Record<Marker["step"], string> = {
  Basic: "#38bdf8",        // sky-400
  Intermediate: "#0ea5e9", // sky-500
  Advanced: "#06b6d4",     // cyan-500
};

 function generatePath(segments: number, w = 1200, segH = 320, startX = 200, topPad = 100) {
  let d = `M ${startX} ${topPad}`;
  let x = startX;
  let y = topPad;
  const leftX = w * 0.15;
  const rightX = w * 0.85;
  const ctrl = w * 0.2;
  for (let i = 0; i < segments; i++) {
    const dirRight = i % 2 === 0;
    const nextX = dirRight ? rightX : leftX;
    const nextY = y + segH;
    const c1x = x + (dirRight ? ctrl : -ctrl);
    const c2x = nextX + (dirRight ? -ctrl : ctrl);
    const c1y = y + segH * 0.3;
    const c2y = y + segH * 0.7;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${nextX} ${nextY}`;
    x = nextX;
    y = nextY;
  }
  const viewBox = { w, h: y + 150 };
  return { d, viewBox };
}

 function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setP(Math.max(0, Math.min(1, progress)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return p;
}

 export default function JavaRoadmap() {
  const segments = 14; // set enough corners
  const { d, viewBox } = useMemo(() => generatePath(segments), [segments]);

  // Place markers at corner ends along the path for clearer "landmarks at corners"
  const markers: Marker[] = useMemo(() => {
    const total = sections.length;
    return sections.map((s, i) => {
      // Map section index to corner position t in (0,1]
      const tCorner = Math.min(0.98, (i + 1) / segments);
      return {
        id: `${s.step}-${s.title}`.toLowerCase().replace(/\s+/g, "-"),
        label: s.title,
        step: s.step,
        items: s.items,
        t: tCorner,
      };
    });
  }, [segments]);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [length, setLength] = useState(0);
  const [scale, setScale] = useState({ x: 1, y: 1, top: 0, left: 0 });
  const progress = useScrollProgress();

  useEffect(() => {
    const update = () => {
      if (!pathRef.current || !svgRef.current) return;
      const L = pathRef.current.getTotalLength();
      setLength(L);
      const rect = svgRef.current.getBoundingClientRect();
      setScale({ x: rect.width / viewBox.w, y: rect.height / viewBox.h, top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    };
    update();
    const ro = new ResizeObserver(update);
    if (svgRef.current) ro.observe(svgRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [viewBox.w, viewBox.h]);

  const markerPositions = useMemo(() => {
    if (!pathRef.current || length === 0) return [] as { id: string; x: number; y: number; m: Marker }[];
    return markers.map((m) => {
      const p = pathRef.current!.getPointAtLength(length * m.t);
      return { id: m.id, x: p.x * scale.x + scale.left, y: p.y * scale.y + scale.top, m };
    });
  }, [markers, length, scale]);

  const drawOffset = Math.max(0, length - length * progress);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-1 w-8 bg-sky-400" />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-sky-400 drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]">
              Full Stack Java Development
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A comprehensive learning path from Java basics to advanced Spring Boot microservices development.
          </p>
        </div>
      </div>

      {/* Roadmap */}
      <section className="relative mx-auto">
        <div className="relative" style={{ height: `${viewBox.h * 0.8}px` }}>
          <svg
            ref={svgRef}
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Road shadow */}
            <path d={d} stroke="#020617" strokeWidth={70} fill="none" transform="translate(4, 4)" opacity={0.6} />
            {/* Road base */}
            <path d={d} stroke="#0b1020" strokeWidth={60} fill="none" />
            {/* Road edges */}
            <path d={d} stroke="#1f2937" strokeWidth={2} fill="none" />
            {/* Center dashed line - animated in sky */}
            <path
              d={d}
              ref={pathRef}
              stroke="#38bdf8"
              strokeWidth={3}
              fill="none"
              strokeDasharray={length}
              strokeDashoffset={drawOffset}
              style={{ transition: "stroke-dashoffset 0.1s linear", filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))" }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Landmarks/Markers */}
          {markerPositions.map(({ id, x, y, m }, idx) => {
            const side = idx % 2 === 0 ? "right" : "left";
            const cardShift = side === "left" ? "-translate-x-[calc(100%+24px)]" : "translate-x-6";
            const align = side === "left" ? "items-end text-right" : "items-start text-left";
            const pinColor = stepColor[m.step];
            const itemsText = m.items.join(", ");
            return (
              <div key={id} className="group pointer-events-auto absolute z-20" style={{ left: x - 20, top: y - 20 }}>
                {/* Landmark Pin */}
                <div className="relative">
                  <div
                    className="h-12 w-12 rounded-full ring-4 ring-black/50 shadow-2xl transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: pinColor }}
                  >
                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80" />
                  </div>

                  {/* Step indicator and title (hover reveals wide tooltip) */}
                  <div className={`absolute ${side === "left" ? "right-14" : "left-14"} top-0`}>
                    <div className={`flex ${align} gap-2`}>
                      <div className="rounded-full px-3 py-1 text-xs font-bold text-black shadow-lg" style={{ backgroundColor: pinColor }}>
                        {m.step}
                      </div>
                    </div>
                    <div className={`mt-2 ${align}`}>
                      <div className="text-white font-bold text-lg leading-tight max-w-xs hover:underline">
                        {m.label}
                      </div>
                    </div>

                    {/* Wide horizontal tooltip showing comma-separated items */}
                    <div
                      className={`invisible absolute top-10 z-30 w-[720px] max-w-[80vw] origin-top scale-95 rounded-xl border border-slate-700 bg-slate-900/95 p-5 opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:visible group-hover:scale-100 group-hover:opacity-100 ${cardShift}`}
                      style={{ boxShadow: `0 0 30px rgba(56, 189, 248, 0.25)` }}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: pinColor }} />
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{m.step} Level</div>
                      </div>
                      <div className="mb-2 font-semibold text-white">{m.label}</div>
                      <div className="text-sm text-slate-200 leading-relaxed">{itemsText}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer with CTA */}
      <div className="relative z-10 px-6 py-12 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-muted-foreground">
            <p className="mb-2">🚀 Complete your Java development journey</p>
            <p className="text-sm">Scroll up to explore each section • Hover over titles for detailed topics</p>
          </div>
          <div className="mt-6">
            <a href="#course" className="inline-block px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">Go to Course</a>
          </div>
        </div>
      </div>
    </div>
  );
}
