"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function BusinessCTA() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const checkpoints = [
    {
      id: 1,
      text: "Do you wish you knew what the big, national contractors know about running a successful company?",
    },
    {
      id: 2,
      text: "Do you want your company to be more organized, efficient, and manageable?",
    },
    {
      id: 3,
      text: "Are you ready to increase your capacity and grow your pipeline of projects?",
    },
  ]

  return (
    <section className="w-full bg-black text-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Are you ready to take your business to the next level?
            </motion.h2>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {checkpoints.map((point) => (
                <motion.li key={point.id} variants={itemVariants} className="flex items-start gap-4">
                  <div className="rounded-full bg-orange-600/20 p-1 mt-1">
                    <Check className="h-5 w-5 text-orange-500" />
                  </div>
                  <p className="text-lg">{point.text}</p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg">
                We&apos;ve helped hundreds of construction companies solve their most persistent problems, and we can help
                you too. If you&apos;d like to talk with an expert about what you want for{" "}
                <span className="font-bold">YOUR</span> business, take action{" "}
                <span className="text-orange-500 font-bold">today</span> and schedule a time to talk with us.
              </p>
              <p className="text-lg">We&apos;re here to help you reach your goals.</p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.6 }}
                className="pt-4"
              >
                {/* <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.PNG-TxbgbG6eroFsCS8k1D5i4sJQfInEAO.png"
                    alt="Adam Cooper Signature"
                    width={200}
                    height={80}
                    className="mb-2"
                  />
                </motion.div> */}
                <p className="font-bold text-xl">Mr. Adam, President</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              whileHover={{
                boxShadow: "0 0 30px rgba(255, 97, 60, 0.3)",
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
              className="relative rounded-full overflow-hidden border-4 border-orange-500/20 w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
            >
              <Image
                src="/images/ceo.jpg"
                alt="Adam Cooper"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg font-medium"
                >
                  Schedule a Free Consultation
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-tr from-orange-900/30 via-black to-black"
      />
    </section>
  )
}

