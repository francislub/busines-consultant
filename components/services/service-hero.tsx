"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import type { Service } from "./data"
import { Button } from "@/components/ui/button"

export interface ServiceHeroProps {
  service: Service
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/70"></div>
          <Image
            src={service.image || "/placeholder.svg?height=800&width=1600"}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-lg bg-red-600/20 px-3 py-1 text-sm text-red-400 mb-4 self-start"
            >
              {service.title}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
            >
              {service.content.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-300 mb-8 max-w-2xl"
            >
              {service.content.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </motion.div>
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
            <Link href="/services" className="hover:text-red-600 transition-colors">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="font-medium text-slate-900">{service.title}</span>
          </div>
        </div>
      </div>
    </>
  )
}

