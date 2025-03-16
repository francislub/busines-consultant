"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface TeamMember {
  id: string
  name: string
  title: string
  image: string
  description?: string
  linkedin?: string
  email?: string
}

interface TeamMemberProps {
  member: TeamMember
  index: number
  isInView: boolean
}

function TeamMember({ member }: TeamMemberProps) {
  const router = useRouter()

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      onClick={() => router.push(`/team/${member.id}`)}
    >
      <motion.div
        className="relative w-64 h-64 rounded-full overflow-hidden mb-6"
      >
        <Image
          src={member.image ? member.image : "/placeholder.svg"}
          alt={member.name}
          fill
          className="object-cover grayscale"
        />
      </motion.div>

      <motion.h3
        className="text-2xl font-semibold text-black mb-2"
      >
        {member.name}
      </motion.h3>

      <motion.p
        className="text-red-500 mb-4 text-sm"
      >
        {member.title}
      </motion.p>

      <motion.div
        className="flex space-x-4"
        onClick={(e) => e.stopPropagation()}
      >
        {member.linkedin && (
          <motion.a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="text-white hover:text-red-500 transition-colors"
          >
            <Linkedin size={20} />
          </motion.a>
        )}
        {member.email && (
          <motion.a
            href={`mailto:${member.email}`}
            whileHover={{ y: -3 }}
            className="text-white hover:text-red-500 transition-colors"
          >
            <Mail size={20} />
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function CoreTeam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTeam() {
      try {
        const response = await fetch("/api/teams")
        const data = await response.json()
        setTeam(data)
      } catch (error) {
        console.error("Error fetching team:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeam()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={containerRef} className="space-y-16">
          <div className="text-center space-y-6">
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
            >
              Meet Our Core Team
            </motion.h2>

            <motion.p
              className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              Our team of construction industry consultants and support staff are
              <br />
              ready to work with you on your business!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {team ? (
              team.map((member, index) => (
                <TeamMember key={member.id} member={member} index={index} isInView={isInView} />
              ))
            ) : (
              <div className="text-center col-span-4">Loading team...</div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Link href="/team">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Meet the Full Team
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

