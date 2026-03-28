"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatCard from './StatCard';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const headlineText = "WELCOME ITIZFIZZ";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".value-letter");
      const car = carRef.current;
      const trail = trailRef.current;
      const headline = headlineRef.current;

      if (!car || !trail || !headline) return;

      const carWidth = 180; // approximate width based on visual
      
      // Initialize letters
      gsap.set(letters, { opacity: 0 });

      // Main Scroll Animation
      gsap.to(car, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: trackRef.current,
          anticipatePin: 1,
        },
        x: () => window.innerWidth - carWidth,
        ease: "none",
        onUpdate: function() {
          const self = this as any;
          const progress = self.progress;
          const currentX = (window.innerWidth - carWidth) * progress;
          const carCenterX = currentX + carWidth / 2;

          // Grow trail
          gsap.set(trail, { width: carCenterX });

          // Reveal letters
          letters.forEach((letter) => {
            const letterRect = letter.getBoundingClientRect();
            const letterX = letterRect.left + letterRect.width / 2;
            
            if (carCenterX >= letterX) {
              gsap.to(letter, { opacity: 1, duration: 0.1, overwrite: true });
            } else {
              gsap.to(letter, { opacity: 0, duration: 0.1, overwrite: true });
            }
          });
        }
      });

      // Stat Card reveals
      const statIds = ["#box1", "#box2", "#box3", "#box4"];
      statIds.forEach((id, index) => {
        gsap.to(id, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${400 + index * 200} top`,
            end: `top+=${600 + index * 200} top`,
            scrub: true,
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
        });
      });

      // Initial Load Animation
      gsap.from(headline, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[250vh] bg-[#121212] overflow-x-hidden">
      <div ref={trackRef} className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[#d1d1d1] overflow-hidden">
        
        {/* Headline Revealed by Car */}
        <div ref={headlineRef} className="absolute top-[25%] left-0 w-full flex justify-center items-center pointer-events-none z-10">
          <h1 className="text-[7rem] md:text-[10rem] font-black text-[#111] flex gap-2 tracking-widest leading-none">
            {headlineText.split("").map((char, i) => (
              <span key={i} className="value-letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Road Track */}
        <div className="relative w-full h-[200px] bg-[#1e1e1e] flex items-center">
          {/* Green Trail */}
          <div ref={trailRef} className="absolute top-0 left-0 h-full bg-[#45db7d] z-0 shadow-[0_0_30px_rgba(69,219,125,0.4)]" />
          
          {/* Car */}
          <img
            ref={carRef}
            src="/car-top-view.png"
            alt="Car"
            className="absolute left-0 z-30 h-[160px] object-contain transition-transform duration-75 will-change-transform"
            style={{ width: '180px' }}
          />
        </div>

        {/* Stat Cards */}
        <StatCard
          id="box1"
          percent="58%"
          description="Increase in pick up point use"
          className="absolute top-[8%] right-[25%] bg-[#def54f] text-[#111]"
        />
        <StatCard
          id="box2"
          percent="23%"
          description="Decreased in customer phone calls"
          className="absolute bottom-[8%] right-[30%] bg-[#6ac9ff] text-[#111]"
        />
        <StatCard
          id="box3"
          percent="27%"
          description="Increase in pick up point use"
          className="absolute top-[8%] right-[5%] bg-[#333] text-white"
        />
        <StatCard
          id="box4"
          percent="40%"
          description="Decreased in customer phone calls"
          className="absolute bottom-[8%] right-[8%] bg-[#fa7328] text-[#111]"
        />

      </div>
    </section>
  );
};

export default HeroSection;
