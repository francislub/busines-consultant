import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ChevronRight, Building, Tag } from "lucide-react"

import { getCaseStudyBySlug, getRelatedCaseStudies } from "@/components/case-studies/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ResultsSection from "@/components/case-studies/results-section"
import CaseStudyCard from "@/components/case-studies/case-study-card"

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    notFound()
  }

  const relatedCaseStudies = getRelatedCaseStudies(caseStudy.id, 2)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/70"></div>
          <Image
            src={caseStudy.image || "/placeholder.svg"}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col max-w-3xl">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors self-start"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all case studies
            </Link>

            <div className="inline-block rounded-lg bg-red-600/20 px-3 py-1 text-sm text-red-400 mb-4 self-start">
              Case Study
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">{caseStudy.title}</h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl">{caseStudy.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-white/80">
                <Building className="h-4 w-4 mr-2" />
                <span>{caseStudy.clientName}</span>
              </div>
              <div className="flex items-center text-white/80">
                <Tag className="h-4 w-4 mr-2" />
                <span>{caseStudy.industry}</span>
              </div>
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
            <Link href="/case-studies" className="hover:text-red-600 transition-colors">
              Case Studies
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="font-medium text-slate-900">{caseStudy.title}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="space-y-12">
                {/* Challenge Section */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">The Challenge</h2>
                  <p className="text-lg text-slate-600">{caseStudy.challenge}</p>
                </div>

                {/* Solution Section */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Solution</h2>
                  <p className="text-lg text-slate-600">{caseStudy.solution}</p>
                </div>

                {/* Image Section */}
                <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={`${caseStudy.clientName} case study`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Case Study Details</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm text-slate-500 mb-1">Client</h4>
                    <p className="font-medium">{caseStudy.clientName}</p>
                  </div>

                  <div>
                    <h4 className="text-sm text-slate-500 mb-1">Industry</h4>
                    <Badge variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-800">
                      {caseStudy.industry}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm text-slate-500 mb-1">Services Provided</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.services.map((service, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                    <Link href="/contact">Discuss Your Project</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <ResultsSection results={caseStudy.results} />

      {/* Testimonial Section */}
      {caseStudy.testimonial && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-50 rounded-xl p-8 md:p-12 shadow-sm border border-slate-200 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>

                <blockquote className="text-xl italic text-slate-700 mb-6 mt-4">
                  "{caseStudy.testimonial.quote}"
                </blockquote>

                <div className="flex items-center">
                  <div className="mr-4 w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                    {caseStudy.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{caseStudy.testimonial.author}</div>
                    <div className="text-slate-600">{caseStudy.testimonial.position}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">
                More Case Studies
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Related Success Stories</h2>
              <p className="text-lg text-slate-600">
                Explore more case studies in similar industries or with related services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedCaseStudies.map((relatedCaseStudy) => (
                <CaseStudyCard key={relatedCaseStudy.id} caseStudy={relatedCaseStudy} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/case-studies">
                  View All Case Studies
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Let's Create Your Success Story</h2>
            <p className="text-lg text-slate-300 mb-8">
              Ready to transform your business and achieve measurable results? Contact us today to discuss how our
              tailored solutions can address your specific challenges.
            </p>
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

