'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Maxwel Mululu',
    role: 'CTO, Xpose Limited',
    content: 'Samwel has been our go-to photographer for major events, from Blankets & Wine, October Fest, The Standard Chartered Marathon and Africa Tech Summit. His ability to capture the energy of large, high-profile crowds while staying sharp on the key moments is exactly why we keep bringing him back.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Charles Mabwa',
    role: 'CMO, Binance EA',
    content: 'Samwel covered our Binance event with real precision, capturing the atmosphere and key moments perfectly. Professional, reliable, and easy to work with from start to finish.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Kind Words
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              CLIENT
              <br />
              TESTIMONIALS
            </h2>
          </div>
          <p className="text-base text-muted-foreground max-w-md leading-relaxed">
            What my clients have to say about working with me on their most important moments.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border p-8 flex flex-col"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-foreground text-foreground"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-border">
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
