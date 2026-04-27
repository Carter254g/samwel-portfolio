'use client';

import { useState, useEffect } from 'react';

const defaultPortfolioItems = [
  { id: 1, title: 'Romantic Wedding Dance', category: 'wedding', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop' },
  { id: 2, title: 'Portrait in Golden Light', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop' },
  { id: 3, title: 'Landscape Serenity', category: 'landscape', image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop' },
  { id: 4, title: 'Product Detail Work', category: 'product', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop' },
  { id: 5, title: 'Wedding Ceremony', category: 'wedding', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop' },
  { id: 6, title: 'Studio Portrait', category: 'portrait', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop' },
];

export function PortfolioSection() {
  const [portfolioItems, setPortfolioItems] = useState(defaultPortfolioItems as any[]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState(['all', 'wedding', 'portrait', 'landscape', 'product']);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          setPortfolioItems(data.images);
          const unique: string[] = ['all', ...Array.from(new Set<string>(data.images.map((i: any) => i.category).filter(Boolean)))];
          setCategories(unique);
        }
      })
      .catch(() => {});
  }, []);

  const filteredItems =
    activeCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Selected Work</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">PORTFOLIO</h2>
          </div>
          <p className="text-base text-muted-foreground max-w-md leading-relaxed">
            A curated selection of recent projects spanning weddings, portraits, landscapes, and product photography.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-border">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all border ${
                activeCategory === category
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden cursor-pointer bg-card">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-96 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{item.category}</p>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
