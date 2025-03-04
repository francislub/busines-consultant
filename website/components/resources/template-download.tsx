"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Template {
  id: string
  title: string
  image: string
  downloadUrl: string
}

export default function TemplateDownloads() {
  const [downloading, setDownloading] = useState<string | null>(null)

  const templates: Template[] = [
    {
      id: "insurance",
      title: "Insurance Coverage Reference List",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r2.PNG-89MXYeSmM3jsk9cN54bi4OHMnMWStG.png",
      downloadUrl: "/downloads/insurance-coverage-list.pdf",
    },
    {
      id: "language",
      title: "Construction Language Reference List",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r2.PNG-89MXYeSmM3jsk9cN54bi4OHMnMWStG.png",
      downloadUrl: "/downloads/construction-language-list.pdf",
    },
    {
      id: "closeout",
      title: "Construction Project Close-Out Meeting Agenda",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r2.PNG-89MXYeSmM3jsk9cN54bi4OHMnMWStG.png",
      downloadUrl: "/downloads/project-closeout-agenda.pdf",
    },
    {
      id: "kpis",
      title: "Financial KPIs for Construction Companies",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r2.PNG-89MXYeSmM3jsk9cN54bi4OHMnMWStG.png",
      downloadUrl: "/downloads/financial-kpis.pdf",
    },
  ]

  const handleDownload = async (template: Template) => {
    setDownloading(template.id)
    try {
      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // In a real application, you would handle the actual file download here
      toast.success("Download started!")
    } catch (error) {
      toast.error("Download failed. Please try again.")
    }
    setDownloading(null)
  }

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Free Construction Template Downloads</h2>
            <p className="text-gray-400">Click to download our FREE resources below.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative aspect-[3/4] group cursor-pointer"
                >
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Download className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                <div className="p-4 space-y-4">
                  <h3 className="font-semibold text-lg leading-tight">{template.title}</h3>

                  <Button
                    onClick={() => handleDownload(template)}
                    disabled={downloading === template.id}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    {downloading === template.id ? (
                      <span className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          <Download className="w-4 h-4" />
                        </motion.div>
                        Downloading...
                      </span>
                    ) : (
                      "Download Now"
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

