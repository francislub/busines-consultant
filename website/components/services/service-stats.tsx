"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Stat {
  value: number
  label: string
  prefix?: string
  suffix?: string
}

export default function ServiceStats() {
  const stats: Stat[] = [
    { value: 95, label: "Client Satisfaction", suffix: "%" },
    { value: 500, label: "Businesses Served", prefix: "+" },
    { value: 12, label: "Years of Experience", prefix: "" },
    { value: 30, label: "Industry Experts", prefix: "" },
  ]

  return (
    <section className="py-12 bg-red-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCounter key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCounter({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const frameDuration = 1000 / 60 // 60fps
      const totalFrames = Math.round(duration / frameDuration)
      const increment = stat.value / totalFrames

      let currentFrame = 0
      const counter = setInterval(() => {
        currentFrame++
        const progress = Math.min(currentFrame / totalFrames, 1)
        setCount(Math.floor(progress * stat.value))

        if (progress === 1) {
          clearInterval(counter)
        }
      }, frameDuration)

      return () => clearInterval(counter)
    }
  }, [isInView, stat.value])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <p className="text-white/80">{stat.label}</p>
    </motion.div>
  )
}

