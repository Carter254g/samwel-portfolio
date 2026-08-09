'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          message: '',
        });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Let&apos;s Work Together
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            GET IN TOUCH
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have a project in mind? Let&apos;s create something amazing together.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm uppercase tracking-wide font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm uppercase tracking-wide font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm uppercase tracking-wide font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                placeholder="+254 165 57342"
              />
            </div>

            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className="block text-sm uppercase tracking-wide font-medium mb-2">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors"
              >
                <option value="">Select a service</option>
                <option value="event">Event & Concert Coverage</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm uppercase tracking-wide font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-900/20 border border-green-700 text-green-200 px-4 py-3">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-900/20 border border-red-700 text-red-200 px-4 py-3">
              Something went wrong. Please try again.
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background hover:bg-card hover:text-foreground hover:border-foreground border border-foreground transition-colors uppercase text-sm tracking-wide font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
