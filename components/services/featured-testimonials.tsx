"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from 'lucide-react'

import { testimonials } from "@/components/services/data"
import { cn } from "@/lib/utils"

export default function FeaturedTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const featuredTestimonials = testimonials.slice(0, 3)
  
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about our services.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "bg-white p-6 rounded-lg shadow-sm border border-slate-200 transition-all duration-300",
                activeIndex === index ? "ring-2 ring-red-500 shadow-md" : ""
              )}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="flex items-center mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                  <p className="text-sm text-slate-600">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              
              <blockquote className="text-slate-700 italic mb-4">
                {testimonial.quote}
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
