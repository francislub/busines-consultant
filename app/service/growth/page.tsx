import type { Metadata } from "next"

import { getServiceBySlug, getServiceTestimonials } from "@/components/services/data"
import ServiceHero from "@/components/services/service-hero"
import ServiceFeatures from "@/components/services/service-features"
import TestimonialCarousel from "@/components/services/testimonial-carousel"
import FAQSection from "@/components/services/faq-section"
import ServiceCta from "@/components/services/service-cta"
import RelatedServices from "@/components/services/related-services"

export const metadata: Metadata = {
  title: "Business Management | Mancha Development Company",
  description:
    "Scale your business strategically with our comprehensive business management consulting services tailored to your unique business objectives and growth goals.",
}

export default function BusinessManagementPage() {
  const service = getServiceBySlug("growth")

  if (!service) {
    return <div>Service not found</div>
  }

  const testimonials = getServiceTestimonials(service.id)

  return (
    <div className="flex flex-col min-h-screen">
      <ServiceHero service={service} />

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Overview</div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                Strategic Business Management Solutions
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Our Business Management consulting services help you create and implement growth strategies tailored to
                your unique business objectives. We provide the expertise and guidance needed to make informed decisions
                and capitalize on emerging market opportunities.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Whether you are looking to expand into new markets, optimize your current operations, or prepare for a
                significant business transition, our team of experienced consultants will work closely with you to
                develop a comprehensive strategy for sustainable growth.
              </p>
              <div className="bg-slate-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Our Approach</h3>
                <ul className="space-y-3">
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
                    <span>Data-driven market analysis and opportunity identification</span>
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
                    <span>Collaborative strategy development with clear KPIs</span>
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
                    <span>Comprehensive implementation support and guidance</span>
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
                    <span>Regular monitoring and strategy refinement</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Business Strategy Session"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">45%</div>
                  <p className="text-slate-700">Average revenue growth within first year</p>
                </div>
                <div className="bg-slate-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">85%</div>
                  <p className="text-slate-700">Successful market expansion rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {service.features && (
        <ServiceFeatures
          features={service.features}
          title="Key Benefits of Our Business Management Services"
          description="Our strategic approach delivers these key advantages to your business"
        />
      )}

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Our Process</div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
              How We Help You Scale Strategically
            </h2>
            <p className="text-lg text-slate-600">
              Our proven methodology ensures your business growth is strategic, sustainable, and successful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-600">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Assessment</h3>
              <p className="text-slate-600 mb-4">
                We conduct a thorough analysis of your current business operations, market position, and growth
                potential.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">SWOT analysis</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Market opportunity identification</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Competitive landscape review</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-600">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Strategy Development</h3>
              <p className="text-slate-600 mb-4">
                We collaborate with you to create a customized growth strategy with clear objectives and actionable
                steps.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Goal setting and KPI definition</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Resource allocation planning</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Risk mitigation strategies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-600">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Implementation Support</h3>
              <p className="text-slate-600 mb-4">
                We provide hands-on guidance and support throughout the implementation of your growth strategy.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Action plan execution</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Team alignment and training</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Process optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-600">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">Monitoring & Refinement</h3>
              <p className="text-slate-600 mb-4">
                We continuously monitor progress, measure results, and refine strategies to ensure optimal outcomes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Performance tracking</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Strategy adjustment</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
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
                  <span className="text-sm">Long-term growth planning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <TestimonialCarousel
          testimonials={testimonials}
          title="Client Success Stories"
          description="Hear from businesses that have achieved remarkable growth with our strategic management services"
        />
      )}

      {/* FAQ Section */}
      {service.faqs && (
        <FAQSection
          faqs={service.faqs}
          title="Frequently Asked Questions"
          description="Find answers to common questions about our business management services"
        />
      )}

      {/* CTA Section */}
      <ServiceCta
        title="Ready to Scale Your Business?"
        description="Schedule a free consultation to discuss how our business management services can help you achieve sustainable growth."
        primaryButtonText="Schedule a Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonLink="/case-studies"
        benefits={[
          "Customized growth strategies tailored to your business",
          "Expert guidance from experienced business consultants",
          "Data-driven approach to identify market opportunities",
          "Comprehensive implementation support",
          "Ongoing monitoring and strategy refinement",
        ]}
      />

      {/* Related Services */}
      <RelatedServices currentServiceId={service.id} />
    </div>
  )
}

