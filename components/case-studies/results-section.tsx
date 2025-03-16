"use client"

import { motion } from "framer-motion"
import { BarChartIcon as ChartBar, LineChart } from "lucide-react"

interface ResultsSectionProps {
  results: string[]
  title?: string
}

export default function ResultsSection({ results, title = "Key Results & Impact" }: ResultsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">Results</div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">{title}</h2>
          <p className="text-lg text-slate-600">Our solutions delivered measurable value and transformative results</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <motion.div
              className="grid grid-cols-1 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {results.map((result, index) => (
                <motion.div key={index} className="flex items-start" variants={itemVariants}>
                  <div className="mt-1 mr-4 flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    {index % 2 === 0 ? (
                      <ChartBar className="w-5 h-5 text-red-600" />
                    ) : (
                      <LineChart className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-lg text-slate-900">{result}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 shadow-sm">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Results visualization"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              Success
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

