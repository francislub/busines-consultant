"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, ArrowRight } from "lucide-react"

import { getFilteredCaseStudies, type Industry, type Service } from "@/components/case-studies/data"
import { Button } from "@/components/ui/button"
import CaseStudyCard from "@/components/case-studies/case-study-card"
import CaseStudyFilters from "@/components/case-studies/case-study-filters"

export default function CaseStudiesPage() {
  const [industryFilter, setIndustryFilter] = useState<Industry | "All">("All")
  const [serviceFilter, setServiceFilter] = useState<Service | "All">("All")

  const handleFilterChange = (industry: Industry | "All", service: Service | "All") => {
    setIndustryFilter(industry)
    setServiceFilter(service)
  }

  const filteredCaseStudies = getFilteredCaseStudies(industryFilter, serviceFilter)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/70"></div>
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Case Studies background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-block rounded-lg bg-red-600/20 px-3 py-1 text-sm text-red-400 mb-4">
              Success Stories
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Our Client Success Stories
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl">
              Explore how we've helped businesses across various industries overcome challenges, optimize operations,
              and achieve exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="#case-studies">Explore Case Studies</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Discuss Your Project</Link>
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
            <span className="font-medium text-slate-900">Case Studies</span>
          </div>
        </div>
      </div>

      {/* Case Studies Introduction */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Our Impact</div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                Real Results for Real Businesses
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                At Mancha Development Company, we measure our success by the results we deliver for our clients. Our
                case studies showcase the tangible impact of our consulting services across different industries and
                business challenges.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Each case study demonstrates our methodical approach to identifying challenges, developing tailored
                solutions, and implementing strategies that drive measurable improvements in efficiency, growth, and
                overall business performance.
              </p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/contact">Discuss Your Challenges</Link>
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Measurable Results</h3>
                <p className="text-slate-600">
                  Our work delivers quantifiable improvements with clear ROI for our clients.
                </p>
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
                <h3 className="text-xl font-semibold mb-2">Rapid Implementation</h3>
                <p className="text-slate-600">
                  We focus on practical solutions that can be implemented quickly and effectively.
                </p>
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
                <h3 className="text-xl font-semibold mb-2">Sustainable Growth</h3>
                <p className="text-slate-600">
                  Our strategies are designed for long-term success and continuous improvement.
                </p>
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
                <h3 className="text-xl font-semibold mb-2">Client Partnership</h3>
                <p className="text-slate-600">
                  We work closely with our clients to ensure solutions match their unique needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section id="case-studies" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Case Studies</div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Explore Our Success Stories</h2>
            <p className="text-lg text-slate-600">
              Browse our case studies to see how we've helped organizations across various industries solve complex
              challenges and achieve their business goals.
            </p>
          </div>

          <CaseStudyFilters
            industryFilter={industryFilter}
            serviceFilter={serviceFilter}
            onFilterChange={handleFilterChange}
            className="mb-8"
          />

          {filteredCaseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredCaseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} featured={caseStudy.featured} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No matching case studies found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your filters or browse all our case studies</p>
              <Button onClick={() => handleFilterChange("All", "All")} variant="outline">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-red-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <p className="text-white/80">Successful Projects</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <p className="text-white/80">Client Satisfaction</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">42%</div>
              <p className="text-white/80">Average Efficiency Gain</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">12</div>
              <p className="text-white/80">Industries Served</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Write Your Success Story?</h2>
              <p className="text-lg text-slate-300 mb-8">
                Contact us today to discuss how our consulting services can help you overcome challenges, optimize
                operations, and achieve sustainable growth for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="bg-slate-800 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Why Work With Us?</h3>
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
                  <span>Tailored solutions that address your specific business challenges</span>
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
                  <span>Measurable results with clear ROI and ongoing support</span>
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
                  <span>Experienced team of industry experts and consultants</span>
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
                  <span>Collaborative approach that ensures your business goals drive our solutions</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <Link
                  href="/testimonials"
                  className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors"
                >
                  Read client testimonials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

