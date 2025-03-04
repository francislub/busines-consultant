"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

interface Client {
  name: string
  logo: string
  website?: string
}

export default function ClientGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const clients: Client[] = [
    {
      name: "Alberici",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Adler Industrial",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Eco Minded Solutions",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "McQueen Electric",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Meridian",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Metro Green Construction",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "M.O.E",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Perras Companies",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Mollies Mechanics",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "FMAI",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Salmon",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Southern Choice Construction",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Blue River",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Southeast Services",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Sudlow Concrete",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Tashman",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Thayer Bros Construction",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Venterra",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Ways Electric",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
    {
      name: "Aerial",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2.PNG-iclKxmzKu3eM8vp6ytIBxSmDRKYKeL.png",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative aspect-[3/2] bg-white/5 rounded-lg p-4 flex items-center justify-center group cursor-pointer overflow-hidden"
            >
              <div className="relative w-full h-full">
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  fill
                  className="object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-red-500/50 to-transparent transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-red-500/50 to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

