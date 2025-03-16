import type { Metadata } from "next"

import { getServiceBySlug, getServiceTestimonials } from "../data"
import ServiceHero from "../components/service-hero"
import ServiceFeatures from "../components/service-features"
import TestimonialCarousel from "../components/testimonial-carousel"
import FAQSection from "../components/faq-section"
import ServiceCta from "../components/service-cta"
import RelatedServices from "../components/related-services"

export const metadata: Metadata = {
  title: "Monitoring and Evaluation | Mancha Development Company",
  description:
    "Maximize your investments with our expert monitoring and evaluation services, including comprehensive assessments, audits, and strategic guidance.",
}

export default function MonitoringEvaluationPage() {
  const service = getServiceBySlug("procore")

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
                Comprehensive Monitoring & Evaluation Services
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Our Monitoring and Evaluation services provide businesses with the tools and expertise needed to assess
                performance, identify improvement opportunities, and ensure optimal resource utilization.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                We offer a range of specialized services including process evaluations, performance audits, efficiency
                assessments, and custom evaluation frameworks tailored to your specific business needs.
              </p>
              <div className="bg-slate-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Key Service Components</h3>
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
                    <span>Comprehensive performance metrics development and tracking</span>
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
                    <span>In-depth process and efficiency audits</span>
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
                    <span>Advanced data analysis and actionable insights</span>
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
                    <span>Continuous improvement frameworks and implementation</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Monitoring and Evaluation Dashboard"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">40%</div>
                  <p className="text-slate-700">Average efficiency improvement</p>
                </div>
                <div className="bg-slate-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">25%</div>
                  <p className="text-slate-700">Typical cost reduction</p>
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
          title="Key Benefits of Our Monitoring & Evaluation Services"
          description="Our comprehensive approach delivers these key advantages to your business"
        />
      )}

      {/* Services Detail Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Our Services</div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
              Comprehensive Monitoring & Evaluation Solutions
            </h2>
            <p className="text-lg text-slate-600">
              We offer a range of specialized services to help you measure, analyze, and improve your business
              performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
              <div className="p-6">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Performance Metrics & KPI Development</h3>
                <p className="text-slate-600 mb-4">
                  We help you establish meaningful key performance indicators (KPIs) and metrics that align with your
                  business objectives and provide actionable insights for decision-making.
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
                    <span className="text-sm">Custom KPI framework development</span>
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
                    <span className="text-sm">Balanced scorecard implementation</span>
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
                    <span className="text-sm">Performance dashboard creation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
              <div className="p-6">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Comprehensive Audit Services</h3>
                <p className="text-slate-600 mb-4">
                  Our audit services help you identify inefficiencies, compliance issues, and improvement opportunities
                  across your business operations and processes.
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
                    <span className="text-sm">Process efficiency audits</span>
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
                    <span className="text-sm">Compliance and risk assessments</span>
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
                    <span className="text-sm">Financial performance reviews</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
              <div className="p-6">
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
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Data Analysis & Insights</h3>
                <p className="text-slate-600 mb-4">
                  We leverage advanced data analysis techniques to extract actionable insights from your business data,
                  helping you make informed decisions and identify improvement opportunities.
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
                    <span className="text-sm">Trend analysis and forecasting</span>
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
                    <span className="text-sm">Performance gap identification</span>
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
                    <span className="text-sm">Actionable recommendation development</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
              <div className="p-6">
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Continuous Improvement Systems</h3>
                <p className="text-slate-600 mb-4">
                  We help you implement systems and processes for ongoing monitoring and continuous business
                  improvement, ensuring sustainable growth and operational excellence.
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
                    <span className="text-sm">Continuous improvement framework design</span>
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
                    <span className="text-sm">Automated monitoring system implementation</span>
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
                    <span className="text-sm">Regular review and optimization processes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <TestimonialCarousel
          testimonials={testimonials}
          title="Client Success Stories"
          description="Hear from businesses that have transformed their operations with our monitoring and evaluation services"
        />
      )}

      {/* FAQ Section */}
      {service.faqs && (
        <FAQSection
          faqs={service.faqs}
          title="Frequently Asked Questions"
          description="Find answers to common questions about our monitoring and evaluation services"
        />
      )}

      {/* CTA Section */}
      <ServiceCta
        title="Ready to Optimize Your Business Performance?"
        description="Schedule a free consultation to discuss how our monitoring and evaluation services can help you identify improvement opportunities and maximize efficiency."
        primaryButtonText="Schedule a Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonLink="/case-studies"
        benefits={[
          "Comprehensive performance assessment",
          "Actionable insights for improvement",
          "Custom metrics and KPIs for your business",
          "Ongoing monitoring and optimization",
          "Expert guidance throughout the process",
        ]}
      />

      {/* Related Services */}
      <RelatedServices currentServiceId={service.id} />
    </div>
  )
}

