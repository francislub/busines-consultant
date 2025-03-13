"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"

interface ServiceCtaProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  benefits?: string[]
}

export default function ServiceCta({
  title = "Ready to Transform Your Business?",
  description = "Schedule a free consultation with our experts to discuss your business needs and discover how our services can help you achieve your goals.",
  primaryButtonText = "Schedule a Consultation",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "/about",
  benefits = [
    "Customized solutions tailored to your business",
    "Expert guidance from industry professionals",
    "Proven methodologies with measurable results",
    "Ongoing support throughout implementation",
    "Flexible engagement options to fit your needs"
  ]
}: ServiceCtaProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              {title}
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href={primaryButtonLink}>
                  {primaryButtonText}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href={secondaryButtonLink}>
                  {secondaryButtonText}
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-slate-800 p-8 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-6">Why Choose Our Services?</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-700">
              <Link 
                href="/case-studies" 
                className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors"
              >
                View our success stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
