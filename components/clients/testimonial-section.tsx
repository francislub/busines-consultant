"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
  position: string
  company: string
}

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const testimonials: Testimonial[] = [
    {
      quote:
        "Working with this team has transformed our construction processes. Their expertise and guidance have been invaluable to our growth.",
      author: "John Smith",
      position: "CEO",
      company: "Metro Green Construction",
    },
    {
      quote:
        "The level of professionalism and industry knowledge they bring to the table is outstanding. They've helped us optimize our operations significantly.",
      author: "Sarah Johnson",
      position: "Operations Director",
      company: "Adler Industrial",
    },
  ]

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 rounded-lg p-6 relative"
              >
                <Quote className="absolute top-6 left-6 w-8 h-8 text-red-500 opacity-50" />

                <div className="pl-12">
                  <p className="text-gray-300 italic mb-6">{testimonial.quote}</p>

                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 right-0 w-24 h-24">
                  <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-red-500/50 to-transparent" />
                  <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-red-500/50 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

