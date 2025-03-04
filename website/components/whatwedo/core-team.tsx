"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"

interface TeamMemberProps {
  name: string
  title: string
  image: string
  index: number
  isInView: boolean
}

function TeamMember({ name, title, image, index, isInView }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.2)" }}
        transition={{ duration: 0.3 }}
        className="relative w-48 h-48 rounded-full overflow-hidden mb-4"
      >
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </motion.div>

      <motion.h3
        className="text-xl font-bold"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      >
        {name}
      </motion.h3>

      <motion.p
        className="text-red-500 mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      >
        {title}
      </motion.p>

      <motion.div
        className="flex space-x-3"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      >
        <motion.a href="#" whileHover={{ y: -3, color: "#0077B5" }} className="text-gray-400 hover:text-gray-300">
          <Linkedin size={18} />
        </motion.a>
        <motion.a href="#" whileHover={{ y: -3, color: "#EA4335" }} className="text-gray-400 hover:text-gray-300">
          <Mail size={18} />
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

export default function CoreTeam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const team = [
    {
      name: "Adam Cooper",
      title: "President",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.PNG-JZLTICTb6srVWNM8HrbANTzKOEtz1p.png",
    },
    {
      name: "Jeff Robertson",
      title: "Principal | Vice President",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.PNG-JZLTICTb6srVWNM8HrbANTzKOEtz1p.png",
    },
    {
      name: "Greg Gorman",
      title: "Senior Consultant",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.PNG-JZLTICTb6srVWNM8HrbANTzKOEtz1p.png",
    },
    {
      name: "Katherine Tuttle",
      title: "Marketing Director",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.PNG-JZLTICTb6srVWNM8HrbANTzKOEtz1p.png",
    },
  ]

  return (
    <div className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={containerRef} className="space-y-12">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "60px" } : { width: 0 }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-red-500 mx-auto"
            />

            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Meet Our Core Team
            </motion.h2>

            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Our team of construction industry consultants and support staff are ready to work with you on your
              business!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                title={member.title}
                image={member.image}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgb(220, 38, 38)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium"
            >
              Meet the Full Team
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

