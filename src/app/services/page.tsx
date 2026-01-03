'use client';

import * as React from 'react';
import { mockServices } from '@/lib/mock-data';
import { Button } from '@/components/ui';
import { ServiceCard } from '@/components/landing';
import Link from 'next/link';
import { ArrowRight, Home, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const activeServices = mockServices.filter(s => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">Silver Maid</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/services" className="text-gray-900 font-medium">
              Services
            </Link>
            <Link href="/book" className="text-gray-600 hover:text-gray-900">
              Book Now
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Cleaning Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional cleaning services tailored to your needs. From regular maintenance to deep cleaning, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {activeServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Why Choose Us */}
        <section className="bg-blue-50 rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Silver Maid?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Professional Team</h3>
                <p className="text-gray-600">
                  Trained and experienced cleaning professionals dedicated to excellence.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
                <p className="text-gray-600">
                  We use environmentally safe cleaning products that are safe for your family.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Guaranteed Quality</h3>
                <p className="text-gray-600">
                  100% satisfaction guaranteed or we'll re-clean at no extra cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Service?</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            Schedule your cleaning service today and experience the Silver Maid difference.
          </p>
          <Link href="/book">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Book Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </section>
      </section>
    </div>
  );
}
