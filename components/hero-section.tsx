'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const DEFAULT_HERO_IMAGE = '/images/hero/profile.jpg';

export function HeroSection() {
  const [heroImage] = useState(DEFAULT_HERO_IMAGE);

  return (
    <section id="home" className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center min-h-[calc(100vh-120px)]">
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <img
              src={heroImage}
              alt="SAMWEL - Professional Photographer"
              className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute top-4 left-4 text-xs font-mono uppercase tracking-[0.3em] text-foreground bg-background/70 backdrop-blur px-3 py-1.5">
              Est. 2020
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Photographer / Visual Storyteller
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              HELLO!
              <br />
              I&apos;M SAMWEL
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              A professional photographer specializing in event and concert coverage, capturing the energy of live moments for brands, organizations, and audiences across Kenya. I would love to share my experience with you.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background hover:bg-muted-foreground transition-colors uppercase text-xs tracking-[0.2em] font-medium group"
              >
                Contact Me
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors uppercase text-xs tracking-[0.2em] font-medium"
              >
                View Work
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">5+</div>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">Years</p>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">100+</div>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">Projects</p>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">50+</div>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
