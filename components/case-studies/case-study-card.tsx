"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Award } from "lucide-react"

import type { CaseStudy } from "../data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  featured?: boolean
}

export default function CaseStudyCard({ caseStudy, featured = false }: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300",
        featured ? "md:col-span-2" : "",
        isHovered ? "shadow-md" : "",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={cn("grid gap-6", featured ? "md:grid-cols-2" : "grid-cols-1")}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={caseStudy.image || "/placeholder.svg?height=400&width=600"}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            {caseStudy.featured && (
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
                  Featured Case Study
                </span>
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{caseStudy.title}</h3>
            <p className="text-white/90 text-sm">{caseStudy.clientName}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-800">
              {caseStudy.industry}
            </Badge>
            {caseStudy.services.map((service, i) => (
              <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                {service}
              </Badge>
            ))}
          </div>

          <p className="text-slate-600 mb-6">{caseStudy.description}</p>

          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Key Results</h4>
              <ul className="space-y-2">
                {caseStudy.results.slice(0, 2).map((result, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-600">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button asChild className="group bg-red-600 hover:bg-red-700">
            <Link href={`/case-studies/${caseStudy.slug}`}>
              View Case Study
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-300",
          isHovered ? "w-full" : "w-0",
        )}
      />
    </motion.div>
  )
}

