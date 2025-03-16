import type { Metadata } from "next"

import { getServiceBySlug, getServiceTestimonials } from "@/components/services/data"
import ServiceHero from "@/components/services/service-hero"
import ServiceFeatures from "@/components/services/service-features"
import TestimonialCarousel from "@/components/services/testimonial-carousel"
import FAQSection from "@/components/services/faq-section"
import ServiceCta from "@/components/services/service-cta"
import RelatedServices from "@/components/services/related-services"

export const metadata: Metadata = {
  title: "Trainer Development | Mancha Development Company",
  description:
    "Gain access to experienced trainers who will mentor and develop your team, ensuring the transfer of critical skills for growth.",
}

export default function TrainerDevelopmentPage() {
  const service = getServiceBySlug("fractional")

  if (!service) {
    return <div>Service not found</div>
  }

  const testimonials = getServiceTestimonials(service.id)

  return (
    <div className="flex flex-col min-h-screen">
      <ServiceHero service={service} breadcrumbSlug="fractional" />

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Overview</div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                Expert Trainer Development Solutions
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Our Trainer Development services provide your business with access to experienced professionals who will
                mentor and develop your team, ensuring the transfer of critical skills for growth and success.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Whether you need full-time expertise, part-time support, or project-based professionals, our trainer
                development solutions are designed to meet your specific business needs and objectives.
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
                    <span>Thorough needs assessment to identify skill gaps and development opportunities</span>
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
                    <span>Careful matching of experienced trainers with your specific requirements</span>
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
                    <span>Structured knowledge transfer and skills development programs</span>
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
                    <span>Ongoing support and progress evaluation to ensure effective learning</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Trainer Development Session"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">90%</div>
                  <p className="text-slate-700">Successful skills transfer rate</p>
                </div>
                <div className="bg-slate-100 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">50%</div>
                  <p className="text-slate-700">Faster team capability development</p>
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
          title="Key Benefits of Our Trainer Development Services"
          description="Our comprehensive approach delivers these key advantages to your business"
        />
      )}

      {/* Services Detail Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Our Services</div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
              Comprehensive Trainer Development Solutions
            </h2>
            <p className="text-lg text-slate-600">
              We offer a range of specialized services to help develop your team&apos;s capabilities and ensure effective
              knowledge transfer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-slate-200 relative">
                <img
                  src="/placeholder.svg?height=192&width=384"
                  alt="Expert Mentorship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Expert Mentorship Programs</h3>
                <p className="text-slate-600 mb-4">
                  Connect your team with seasoned professionals who provide guidance, share industry expertise, and help
                  develop critical skills through one-on-one mentorship.
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
                    <span className="text-sm">Personalized development plans</span>
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
                    <span className="text-sm">Regular coaching sessions</span>
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
                    <span className="text-sm">Industry-specific expertise</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-slate-200 relative">
                <img
                  src="/placeholder.svg?height=192&width=384"
                  alt="Skills Transfer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Structured Skills Transfer</h3>
                <p className="text-slate-600 mb-4">
                  Our structured programs are designed to effectively transfer critical skills to your team members,
                  ensuring they develop the capabilities needed for success.
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
                    <span className="text-sm">Hands-on learning experiences</span>
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
                    <span className="text-sm">Progressive skill development</span>
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
                    <span className="text-sm">Practical application exercises</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-slate-200 relative">
                <img
                  src="/placeholder.svg?height=192&width=384"
                  alt="Custom Training"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Custom Training Programs</h3>
                <p className="text-slate-600 mb-4">
                  We develop tailored training programs designed to address your specific business needs and help your
                  team develop the skills required for success.
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
                    <span className="text-sm">Needs-based curriculum development</span>
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
                    <span className="text-sm">Interactive workshop facilitation</span>
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
                    <span className="text-sm">Ongoing learning resources</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-slate-100 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Flexible Engagement Options</h3>
                <p className="text-slate-600 mb-6">
                  We offer various engagement models to meet your specific business needs and budget constraints,
                  ensuring you get the right level of support for your team development goals.
                </p>
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
                    <div>
                      <span className="font-semibold block">Full-time trainers</span>
                      <span className="text-sm text-slate-500">Dedicated support for intensive development needs</span>
                    </div>
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
                    <div>
                      <span className="font-semibold block">Part-time trainers</span>
                      <span className="text-sm text-slate-500">Flexible support for ongoing development needs</span>
                    </div>
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
                    <div>
                      <span className="font-semibold block">Project-based trainers</span>
                      <span className="text-sm text-slate-500">
                        Targeted support for specific initiatives or projects
                      </span>
                    </div>
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
                    <div>
                      <span className="font-semibold block">Workshop facilitators</span>
                      <span className="text-sm text-slate-500">Specialized support for group training sessions</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Flexible Engagement Options"
                  className="object-cover w-full h-full"
                />
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
          description="Hear from businesses that have transformed their teams with our trainer development services"
        />
      )}

      {/* FAQ Section */}
      {service.faqs && (
        <FAQSection
          faqs={service.faqs}
          title="Frequently Asked Questions"
          description="Find answers to common questions about our trainer development services"
        />
      )}

      {/* CTA Section */}
      <ServiceCta
        title="Ready to Develop Your Team's Capabilities?"
        description="Schedule a free consultation to discuss how our trainer development services can help you build a skilled and high-performing team."
        primaryButtonText="Schedule a Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonLink="/case-studies"
        benefits={[
          "Access to experienced industry professionals",
          "Customized training programs for your specific needs",
          "Effective knowledge and skills transfer",
          "Flexible engagement options to fit your budget",
          "Measurable improvement in team capabilities",
        ]}
      />

      {/* Related Services */}
      <RelatedServices currentServiceId={service.id} />
    </div>
  )
}

