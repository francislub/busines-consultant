import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from 'lucide-react'

import { getRelatedServices } from "@/components/services/data"
import { Button } from "@/components/ui/button"

interface RelatedServicesProps {
  currentServiceId: number
  limit?: number
}

export default function RelatedServices({ currentServiceId, limit = 3 }: RelatedServicesProps) {
  const relatedServices = getRelatedServices(currentServiceId, limit)
  
  if (relatedServices.length === 0) {
    return null
  }
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">
            Explore More
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Related Services
          </h2>
          <p className="text-lg text-slate-600">
            Discover other services that complement your business needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {relatedServices.map((service) => (
            <div key={service.id} className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg?height=400&width=600"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                
                <Button asChild className="group bg-red-600 hover:bg-red-700">
                  <Link href={service.content.buttonLink}>
                    {service.content.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
