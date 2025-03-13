import type { Metadata } from "next"

import { getServiceBySlug, getServiceTestimonials } from "@/components/services/data"
import ServiceHero from "@/components/services/service-hero"
import ServiceFeatures from "@/components/services/service-features"
import TestimonialCarousel from "@/components/services/testimonial-carousel"
import FAQSection from "@/components/services/faq-section"
import ServiceCta from "@/components/services/service-cta"
import RelatedServices from "@/components/services/related-services"

export const metadata: Metadata = {
  title: "Entrepreneurial Skills Development | Mancha Development Company",
  description:
    "Refine your entrepreneurial skills, streamline operations, and optimize team performance with our expert business skills development services.",
}

export default function EntrepreneurialSkillsPage() {
  const service = getServiceBySlug("operations")

  if (!service) {
    return <div>Service not found</div>
  }

  const testimonials = getServiceTestimonials(service.id)

  return (
    <div className="flex flex-col min-h-screen">
      <ServiceHero service={service} breadcrumbSlug="operations" />

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Overview</div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                Develop Essential Entrepreneurial Skills
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Our Entrepreneurial Skills Development program is designed to help business owners and leaders refine
                their skills, streamline operations, and optimize team performance for sustainable growth.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Whether you're a startup founder or an established business owner looking to scale, our expert team will
                guide you through a customized program that addresses your specific challenges and goals.
              </p>
              <div className="bg-slate-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Program Highlights</h3>
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
                    <span>Personalized skill assessment and development plan</span>
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
                    <span>One-on-one coaching with experienced business mentors</span>
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
                    <span>Practical workshops focused on real-world application</span>
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
                    <span>Ongoing support and accountability throughout implementation</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Entrepreneurial Skills Workshop"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">30%</div>
                  <p className="text-slate-700">Average increase in operational efficiency</p>
                </div>
                <div className="bg-slate-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">92%</div>
                  <p className="text-slate-700">Client satisfaction rate</p>
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
          title="Key Benefits of Our Entrepreneurial Skills Program"
          description="Our comprehensive approach delivers these key advantages to your business"
        />
      )}

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Our Process</div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
              How We Develop Your Entrepreneurial Skills
            </h2>
            <p className="text-lg text-slate-600">
              Our structured approach ensures you develop the skills you need to succeed
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-slate-200 hidden md:block"></div>

            <div className="space-y-12 relative">
              {/* Step 1 */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="md:text-right">
                  <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm text-slate-600 mb-4">
                    Step 1
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Assessment & Discovery</h3>
                  <p className="text-slate-600">
                    We begin with a comprehensive assessment of your current skills, business operations, and team
                    dynamics. This helps us identify strengths, weaknesses, and opportunities for improvement.
                  </p>
                </div>
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center z-10 hidden md:flex">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="bg-slate-100 p-6 rounded-lg md:ml-8">
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
                        <span>Skills gap analysis</span>
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
                        <span>Business operations review</span>
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
                        <span>Team performance evaluation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center z-10 hidden md:flex">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="bg-slate-100 p-6 rounded-lg md:mr-8">
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
                        <span>Customized development roadmap</span>
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
                        <span>Prioritized skill development areas</span>
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
                        <span>Measurable goals and milestones</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm text-slate-600 mb-4">
                    Step 2
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Customized Plan Development</h3>
                  <p className="text-slate-600">
                    Based on our assessment, we develop a tailored plan that addresses your specific needs and goals.
                    This includes a roadmap for skill development, operational improvements, and team optimization.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="md:text-right">
                  <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm text-slate-600 mb-4">
                    Step 3
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Implementation & Training</h3>
                  <p className="text-slate-600">
                    We work with you to implement the plan through a combination of one-on-one coaching, workshops, and
                    practical exercises designed to develop your entrepreneurial skills and improve business operations.
                  </p>
                </div>
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center z-10 hidden md:flex">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="bg-slate-100 p-6 rounded-lg md:ml-8">
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
                        <span>Hands-on skill development</span>
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
                        <span>Process optimization implementation</span>
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
                        <span>Team training and development</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center z-10 hidden md:flex">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="bg-slate-100 p-6 rounded-lg md:mr-8">
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
                        <span>Progress tracking and measurement</span>
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
                        <span>Ongoing coaching and support</span>
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
                        <span>Continuous improvement strategies</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm text-slate-600 mb-4">
                    Step 4
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Monitoring & Ongoing Support</h3>
                  <p className="text-slate-600">
                    We provide ongoing support and monitoring to ensure the successful implementation of your
                    development plan. This includes regular check-ins, progress assessments, and adjustments as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <TestimonialCarousel
          testimonials={testimonials}
          title="Success Stories"
          description="Hear from entrepreneurs who have transformed their businesses with our skills development program"
        />
      )}

      {/* FAQ Section */}
      {service.faqs && (
        <FAQSection
          faqs={service.faqs}
          title="Frequently Asked Questions"
          description="Find answers to common questions about our entrepreneurial skills development program"
        />
      )}

      {/* CTA Section */}
      <ServiceCta
        title="Ready to Enhance Your Entrepreneurial Skills?"
        description="Schedule a free consultation to discuss how our entrepreneurial skills development program can help you streamline operations and boost performance."
        primaryButtonText="Schedule a Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonLink="/case-studies"
        benefits={[
          "Personalized skill development plan",
          "Expert guidance from experienced business mentors",
          "Practical strategies you can implement immediately",
          "Measurable improvements in operational efficiency",
          "Ongoing support throughout your business journey",
        ]}
      />

      {/* Related Services */}
      <RelatedServices currentServiceId={service.id} />
    </div>
  )
}

