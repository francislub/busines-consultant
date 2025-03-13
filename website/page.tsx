import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ChevronRight, ArrowRight } from "lucide-react"

import { services } from "./data"
import ServiceCard from "./components/service-card"
import { Button } from "@/components/ui/button"
import ServiceStats from "./components/service-stats"
import FeaturedTestimonials from "./components/featured-testimonials"

export const metadata: Metadata = {
  title: "Our Services | Mancha Development Company",
  description:
    "Explore our comprehensive range of business consulting services designed to help your business grow and succeed.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/70"></div>
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Services background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-block rounded-lg bg-red-600/20 px-3 py-1 text-sm text-red-400 mb-4">
              Our Services
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Expert Solutions for Business Growth
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl">
              We offer comprehensive consulting services designed to help businesses of all sizes optimize operations,
              develop strategic plans, and achieve sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="#services">Explore Our Services</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-slate-100 py-3 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center text-sm text-slate-600">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="font-medium text-slate-900">Services</span>
          </div>
        </div>
      </div>

      {/* Services Introduction */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                How We Help Your Business Succeed
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                At Mancha Development Company, we understand the challenges businesses face in today's competitive
                landscape. Our comprehensive suite of services is designed to address these challenges and help you
                achieve your goals.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Whether you're looking to refine your entrepreneurial skills, implement strategic business management,
                establish effective monitoring systems, or develop your training capabilities, our expert team is here
                to guide you every step of the way.
              </p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/about">Learn About Our Approach</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Tailored Solutions</h3>
                <p className="text-slate-600">Customized strategies designed specifically for your business needs.</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Rapid Results</h3>
                <p className="text-slate-600">Strategies focused on delivering measurable outcomes quickly.</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
                <p className="text-slate-600">Continuous guidance to ensure long-term success and sustainability.</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                <p className="text-slate-600">Access to experienced professionals with proven industry expertise.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ServiceStats />

      {/* Services List */}
      <section id="services" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Our Expertise</div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Comprehensive Business Solutions</h2>
            <p className="text-lg text-slate-600">
              Explore our range of specialized services designed to address your specific business needs and help you
              achieve sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <FeaturedTestimonials />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Transform Your Business?</h2>
              <p className="text-lg text-slate-300 mb-8">
                Schedule a free consultation with our experts to discuss your business needs and discover how our
                services can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/case-studies">View Case Studies</Link>
                </Button>
              </div>
            </div>
            <div className="bg-slate-800 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Why Choose Mancha Development Company?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Proven track record of success across various industries</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customized solutions tailored to your specific business needs</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Expert team with extensive industry experience</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comprehensive support throughout the implementation process</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Measurable results and ROI-focused strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
              Common Questions About Our Services
            </h2>
            <p className="text-lg text-slate-600">
              Find answers to the most frequently asked questions about our consulting services and how we can help your
              business.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold mb-2">
                  How long does it typically take to see results from your services?
                </h3>
                <p className="text-slate-600">
                  While some operational improvements may be visible within weeks, meaningful business growth typically
                  begins to materialize within 3-6 months. Our strategies include both quick wins and long-term
                  sustainable growth initiatives.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold mb-2">Do you work with businesses of all sizes?</h3>
                <p className="text-slate-600">
                  Yes, we work with businesses of all sizes, from startups to established enterprises. Our services are
                  tailored to meet the specific needs and challenges of your business, regardless of its size or
                  industry.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold mb-2">
                  How do you measure the success of your consulting services?
                </h3>
                <p className="text-slate-600">
                  We establish clear, measurable KPIs at the beginning of our engagement and track progress throughout.
                  Our success is measured by your success - whether that's increased revenue, improved operational
                  efficiency, or other specific goals we've defined together.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold mb-2">What industries do you specialize in?</h3>
                <p className="text-slate-600">
                  Our team has experience across a wide range of industries including technology, healthcare, retail,
                  manufacturing, financial services, and more. This diverse expertise allows us to bring best practices
                  and innovative solutions to your specific industry challenges.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold mb-2">
                  Do you offer ongoing support after the initial engagement?
                </h3>
                <p className="text-slate-600">
                  Yes, we provide ongoing support options to ensure the long-term success of the strategies and systems
                  we implement. Many clients choose to maintain a relationship with us for continuous optimization and
                  adaptation as their business evolves.
                </p>
              </div>
            </div>
            <div className="text-center mt-10">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/faq">
                  View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

