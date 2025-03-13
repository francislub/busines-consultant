"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'

import { Service } from "@/components/services/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  service: Service
  featured?: boolean
}

export default function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300",
        featured ? "md:col-span-2" : "",
        isHovered ? "shadow-md" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={cn(
        "grid gap-6",
        featured ? "md:grid-cols-2" : "grid-cols-1"
      )}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={service.image || "/placeholder.svg?height=400&width=600"}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-white/90 text-sm">{service.description}</p>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-3">{service.content.title}</h3>
          <p className="text-slate-600 mb-6">{service.content.description}</p>
          
          {service.features && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Key Features</h4>
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-600">{feature.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <Button asChild className="group bg-red-600 hover:bg-red-700">
            <Link href={service.content.buttonLink}>
              {service.content.buttonText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-300",
          isHovered ? "w-full" : "w-0"
        )}
      />
    </motion.div>
  )
}
