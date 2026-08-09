'use client';

import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = 2021;

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4">SAMWEL</h3>
            <p className="text-muted-foreground text-sm">
              Professional photographer with 5+ years of experience specializing in portrait, landscape, and commercial photography.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#home" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-foreground transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Event & Concert Coverage
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="mailto:obarasamwel48@gmail.com" className="hover:text-foreground transition-colors">
                  obarasamwel48@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+25416557342" className="hover:text-foreground transition-colors">
                  +254 165 57342
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-muted-foreground text-sm">
              © {currentYear} SAMWEL Photography. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:obarasamwel48@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
