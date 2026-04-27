'use client';

import { Heart, Camera, Box, Video, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Portrait',
    description:
      'Capturing the essence and personality of individuals through artful headshots, family portraits, and personal branding sessions.',
  },
  {
    icon: Camera,
    title: 'Landscape',
    description:
      'Discovering the beauty of natural scenery, from dramatic vistas to serene environments, with exceptional clarity and depth.',
  },
  {
    icon: Box,
    title: 'Commercial',
    description:
      'High-quality product, corporate, and brand imagery built to elevate marketing campaigns and convert customers.',
  },
  {
    icon: Video,
    title: 'Events',
    description:
      'Comprehensive coverage that documents the emotions and moments that matter, from corporate to personal occasions.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              What I Do
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-[1.05]">
              I TELL THE STORY
              <br />
              OF THE TIME.
            </h2>
          </div>
          <p className="text-base text-muted-foreground max-w-md leading-relaxed">
            A focused range of professional photography services tailored to capture your unique moments and tell your story through visual imagery.
          </p>
        </div>

        {/* Services Grid - 4 in a line on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-background p-8 hover:bg-card transition-colors group flex flex-col"
              >
                <div className="flex items-start justify-between mb-8">
                  <Icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                  <span className="text-xs font-mono text-muted-foreground tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wide mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <button className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-medium text-foreground self-start">
                  <span className="border-b border-foreground pb-0.5">View Service</span>
                  <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors uppercase text-xs tracking-[0.2em] font-medium">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}
