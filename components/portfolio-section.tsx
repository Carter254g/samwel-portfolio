'use client';

const portfolioItems = [
  { id: 1, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-01.jpg' },
  { id: 2, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-02.jpg' },
  { id: 3, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-03.jpg' },
  { id: 4, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-04.jpg' },
  { id: 5, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-05.jpg' },
  { id: 6, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-06.jpg' },
  { id: 7, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-07.jpg' },
  { id: 8, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-08.jpg' },
  { id: 9, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-09.jpg' },
  { id: 10, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-10.jpg' },
  { id: 11, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-11.jpg' },
  { id: 12, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-12.jpg' },
  { id: 13, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-13.jpg' },
  { id: 14, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-14.jpg' },
  { id: 15, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-15.jpg' },
  { id: 16, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-16.jpg' },
  { id: 17, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-17.jpg' },
  { id: 18, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-18.jpg' },
  { id: 19, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-19.jpg' },
  { id: 20, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-20.jpg' },
  { id: 21, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-21.jpg' },
  { id: 22, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-22.jpg' },
  { id: 23, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-23.jpg' },
  { id: 24, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-24.jpg' },
  { id: 25, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-25.jpg' },
  { id: 26, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-26.jpg' },
  { id: 27, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-27.jpg' },
  { id: 28, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-28.jpg' },
  { id: 29, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-29.jpg' },
  { id: 30, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-30.jpg' },
  { id: 31, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-31.jpg' },
  { id: 32, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-32.jpg' },
  { id: 33, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-33.jpg' },
  { id: 34, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-34.jpg' },
  { id: 35, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-35.jpg' },
  { id: 36, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-36.jpg' },
  { id: 37, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-37.jpg' },
  { id: 38, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-38.jpg' },
  { id: 39, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-39.jpg' },
  { id: 40, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-40.jpg' },
  { id: 41, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-41.jpg' },
  { id: 42, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-42.jpg' },
  { id: 43, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-43.jpg' },
  { id: 44, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-44.jpg' },
  { id: 45, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-45.jpg' },
  { id: 46, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-46.jpg' },
  { id: 47, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-47.jpg' },
  { id: 48, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-48.jpg' },
  { id: 49, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-49.jpg' },
  { id: 50, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-50.jpg' },
  { id: 51, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-51.jpg' },
  { id: 52, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-52.jpg' },
  { id: 53, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-53.jpg' },
  { id: 54, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-54.jpg' },
  { id: 55, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-55.jpg' },
  { id: 56, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-56.jpg' },
  { id: 57, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-57.jpg' },
  { id: 58, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-58.jpg' },
  { id: 59, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-59.jpg' },
  { id: 60, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-60.jpg' },
  { id: 61, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-61.jpg' },
  { id: 62, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-62.jpg' },
  { id: 63, title: 'Live Event Coverage', category: 'events', image_url: '/images/portfolio/event-63.jpg' },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Selected Work</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">PORTFOLIO</h2>
          </div>
          <p className="text-base text-muted-foreground max-w-md leading-relaxed">
            A curated selection of recent event and concert coverage, capturing the energy of live moments as they happen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden cursor-pointer bg-card">
              <img
                src={item.image_url}
                alt={item.title}
                loading="lazy"
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
