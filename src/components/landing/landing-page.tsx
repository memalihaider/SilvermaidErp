'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  Sparkles,
  Clock,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 will-change-transform">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Silver Maid</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/services" className="hover:text-blue-600 transition">Services</Link>
            <a href="#why-us" className="hover:text-blue-600 transition">Why Us</a>
            <a href="#testimonials" className="hover:text-blue-600 transition">Testimonials</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            </Link>
            <Link href="/book">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
              <Zap className="h-3 w-3" />
              #1 Cleaning Service in Dubai
            </div>
            <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Sparkling Clean Spaces, <span className="text-blue-600">Effortlessly.</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Experience the gold standard of cleaning. Silver Maid combines expert professionals with cutting-edge technology to deliver a spotless home or office, every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/book" className="w-full sm:w-auto">
                <Button size="xl" className="w-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/25 group">
                  Book Your Clean Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform will-change-transform" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="xl" variant="outline" className="w-full border-2">
                  View Services
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-[filter] duration-500">
              <div className="flex items-center gap-2 font-bold text-xl">TRUSTED BY</div>
              <div className="h-8 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-32 bg-gray-200 rounded" />
              <div className="h-8 w-28 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Our Expertise</h2>
              <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Cleaning Solutions Tailored to Your Lifestyle
              </h3>
            </div>
            <p className="text-gray-600 text-lg max-w-md">
              From cozy apartments to sprawling corporate offices, we have the right team and tools for every job.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group relative rounded-3xl border border-gray-200 p-8 hover:border-blue-600 transition-[border-color,box-shadow] duration-300 hover:shadow-2xl hover:shadow-blue-600/10 bg-white overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors" />
                <service.icon className="h-14 w-14 text-blue-600 mb-6 relative z-10" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">{service.name}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed relative z-10">{service.description}</p>
                <div className="space-y-3 relative z-10">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-gray-700 font-medium">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-8 p-0 text-blue-600 font-bold group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32 bg-blue-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-blue-200 font-bold uppercase tracking-widest text-sm mb-4">The Process</h2>
            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight">How Silver Maid Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="text-8xl font-black text-white/10 absolute -top-10 -left-4 select-none">
                  0{index + 1}
                </div>
                <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                <p className="text-blue-100 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Why Choose Us</h2>
              <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-8">
                We Don't Just Clean, We Care for Your Space
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="group">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                      <benefit.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-32 w-32 text-blue-600/20 animate-pulse" />
                </div>
                {/* Placeholder for an actual image */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-2xl border border-white/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      SM
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Silver Maid Pro</div>
                      <div className="text-xs text-gray-500">Verified Professional</div>
                    </div>
                  </div>
                  <div className="flex gap-1 text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="text-sm text-gray-600 italic">"Always punctual and incredibly thorough. My office has never looked better!"</p>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 h-24 w-24 bg-blue-600 rounded-full -z-10" />
              <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-blue-100 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Testimonials</h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">Loved by Dubai's Finest</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-3xl border border-gray-200 p-10 bg-white shadow-sm hover:shadow-xl transition-all duration-300 relative">
                <div className="text-6xl text-blue-100 absolute top-6 right-8 font-serif">"</div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">FAQ</h2>
            <h3 className="text-4xl font-bold text-gray-900 tracking-tight">Common Questions</h3>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-gray-200 p-6 hover:border-blue-600 transition-colors cursor-pointer group">
                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center justify-between">
                  {faq.q}
                  <span className="text-blue-600 group-hover:rotate-90 transition-transform">+</span>
                </h4>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[3rem] bg-blue-600 p-12 sm:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/40">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-6xl font-bold mb-8 tracking-tight">Ready for a Spotless Space?</h2>
              <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                Join 500+ happy customers in Dubai. Book your first cleaning in less than 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/book">
                  <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 px-12 font-bold shadow-xl">
                    Book Now
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10 px-12 font-bold">
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Silver Maid</h3>
              </div>
              <p className="text-sm leading-relaxed mb-8">
                Dubai's premier cleaning service platform. We bring professional excellence to every corner of your space.
              </p>
              <div className="flex gap-4">
                {['fb', 'tw', 'ig', 'li'].map(social => (
                  <div key={social} className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                    <span className="uppercase text-xs font-bold">{social}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Services</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Residential Cleaning</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Commercial Cleaning</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Deep Cleaning</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Move-in/out Cleaning</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Our Team</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
              <p className="text-sm mb-6">Get cleaning tips and exclusive offers.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-gray-900 border-gray-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Join</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; 2026 Silver Maid Cleaning Services. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const stats = [
  { label: 'Happy Clients', value: '500+' },
  { label: 'Cleanings Done', value: '2,500+' },
  { label: 'Expert Staff', value: '50+' },
  { label: 'Rating', value: '4.9/5' },
];

const steps = [
  {
    title: 'Book Online',
    description: 'Select your service, date, and time in less than 60 seconds through our intuitive platform.',
    icon: Clock,
  },
  {
    title: 'We Clean',
    description: 'Our verified professionals arrive on time with all necessary equipment to transform your space.',
    icon: Sparkles,
  },
  {
    title: 'Enjoy Your Space',
    description: 'Relax and enjoy your sparkling clean environment. Payment is handled securely after the job.',
    icon: CheckCircle,
  },
];

const faqs = [
  {
    q: 'Are your cleaners background checked?',
    a: 'Yes, every single professional on our platform undergoes a rigorous background check and multi-stage interview process.',
  },
  {
    q: 'Do I need to provide cleaning supplies?',
    a: 'No, our team comes fully equipped with premium, eco-friendly cleaning supplies and professional-grade equipment.',
  },
  {
    q: 'What if I am not satisfied with the clean?',
    a: 'We offer a 100% satisfaction guarantee. If you are not happy, we will send a team back to re-clean at no extra cost.',
  },
];


const services = [
  {
    id: 1,
    name: 'Residential Cleaning',
    description: 'Deep cleaning for homes',
    icon: Sparkles,
    features: ['Eco-friendly products', 'Flexible scheduling', 'Trained staff'],
  },
  {
    id: 2,
    name: 'Commercial Cleaning',
    description: 'Professional office & retail cleaning',
    icon: BarChart3,
    features: ['After-hours service', 'Customizable plans', 'Quality assured'],
  },
  {
    id: 3,
    name: 'Deep Cleaning',
    description: 'Comprehensive sanitization',
    icon: Shield,
    features: ['Hospital-grade cleaning', 'Allergen removal', 'Health certified'],
  },
];

const benefits = [
  {
    id: 1,
    title: 'Experienced Team',
    description: 'Our professional cleaners are thoroughly vetted, trained, and background-checked for your peace of mind.',
    icon: Users,
  },
  {
    id: 2,
    title: 'Real-time Tracking',
    description: 'Track your booking in real-time, communicate directly with your cleaner, and get photos of the work.',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Flexible Scheduling',
    description: 'Choose the day and time that works best for you. We work around your schedule, not the other way around.',
    icon: Clock,
  },
  {
    id: 4,
    title: '100% Satisfaction Guarantee',
    description: 'Not satisfied? We\'ll re-clean at no charge or provide a full refund within 48 hours.',
    icon: CheckCircle,
  },
];

const testimonials = [
  {
    id: 1,
    quote: 'Silver Maid has transformed how we manage cleaning for our office. The app is intuitive and the team is always professional.',
    author: 'Ahmed Al-Maktoum',
    company: 'Tech Startup, Dubai',
  },
  {
    id: 2,
    quote: 'Best cleaning service I\'ve used in Dubai. The staff is reliable, thorough, and the booking system is so convenient.',
    author: 'Sarah Johnson',
    company: 'Real Estate Manager',
  },
  {
    id: 3,
    quote: 'Professional, affordable, and they show up on time every single time. Highly recommend Silver Maid!',
    author: 'Mohammed Hassan',
    company: 'Restaurant Owner',
  },
];
