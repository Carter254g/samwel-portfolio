'use client';

import { Video, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Video,
    title: 'Event & Concert Coverage',
    description:
      'Comprehensive coverage that documents the energy and emotion of live events and concerts, capturing every key moment as it happens.',
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 max-w-md gap-px bg-border border border-border">
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
                <a
                  href="#portfolio"
                  className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-medium text-foreground self-start"
                >
                  <span className="border-b border-foreground pb-0.5">View Service</span>
                  <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
