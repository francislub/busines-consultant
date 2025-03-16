"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from 'lucide-react'

import { FAQ } from "@/components/services/data"
import { cn } from "@/lib/utils"

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  description?: string
}

export default function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our services"
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">
            FAQ
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            {title}
          </h2>
          <p className="text-lg text-slate-600">
            {description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-slate-200 rounded-lg bg-white overflow-hidden"
              >
                <button
                  className={cn(
                    "flex items-center justify-between w-full p-6 text-left",
                    openIndex === index ? "bg-slate-50" : ""
                  )}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-slate-500 transition-transform duration-300",
                      openIndex === index ? "transform rotate-180" : ""
                    )} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
