'use client';

import { useState } from 'react';

const DEFAULT_ABOUT_IMAGE = '/images/about/profile.jpg';

export function AboutSection() {
  const [aboutImage] = useState(DEFAULT_ABOUT_IMAGE);

  return (
    <section id="about" className="py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={aboutImage}
              alt="SAMWEL - Professional Photographer"
              className="w-full h-auto object-cover grayscale"
            />
            <div className="absolute -bottom-4 -right-4 hidden md:block bg-background border border-border px-6 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1">Based in</p>
              <p className="text-base font-bold">Nairobi, Kenya</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">About Me</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                FRAMING
                <br />
                THE UNSEEN.
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With over 5 years of professional photography experience, I have developed a unique eye for capturing moments that matter. My journey began with a passion for visual storytelling and has evolved into a comprehensive portfolio spanning multiple disciplines.
              </p>
              <p>
                My expertise centers on event and concert photography, from high-profile summits and marathons to festivals and brand activations. I believe in the power of light, timing, and being in the right place at the right moment to capture images that resonate on an emotional level.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">5+</div>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">Years Experience</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">Projects</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
