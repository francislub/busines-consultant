"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PhotoCard from "./photo-card"
import { Button } from "@/components/ui/button"

interface Photo {
  id: number
  src: string
  alt: string
  title?: string
  description?: string
}

export default function PhotoGallery() {
  const photos: Photo[] = [
    {
      id: 1,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.PNG-4gjbvWgAzMKxtvbK8DsT2EzrhzZnLb.png",
      alt: "Procore Banner",
      title: "Procore Specialists",
      description: "We help contractors maximize their investment in Procore",
    },
    {
      id: 2,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.PNG-TxbgbG6eroFsCS8k1D5i4sJQfInEAO.png",
      alt: "Business Growth",
      title: "Take Your Business to the Next Level",
      description: "Expert guidance for construction companies",
    },
    // Add more photos as needed
  ]

  // const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToNext = () => {
    if (containerRef.current) {
      const container = containerRef.current
      container.scrollBy({ left: container.offsetWidth * 0.8, behavior: "smooth" })
    }
  }

  const scrollToPrev = () => {
    if (containerRef.current) {
      const container = containerRef.current
      container.scrollBy({ left: -container.offsetWidth * 0.8, behavior: "smooth" })
    }
  }

  return (
    <div className="relative w-full py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 md:px-6"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Our Portfolio</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={scrollToPrev} className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" size="icon" onClick={scrollToNext} className="rounded-full">
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex space-x-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {photos.map((photo) => (
            <div key={photo.id} className="flex-none w-[280px] md:w-[350px] snap-start">
              <PhotoCard src={photo.src} alt={photo.alt} title={photo.title} description={photo.description} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

