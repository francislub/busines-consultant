"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Briefcase } from "lucide-react"
import Link from "next/link"

export default function ContactInfo() {
  const contactItems = [
    {
      title: "Headquarters",
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      details: ["400 Interstate North Pkwy, Suite 500,", "Atlanta, GA 30339"],
      link: "https://maps.google.com/?q=400+Interstate+North+Pkwy+Suite+500+Atlanta+GA+30339",
      linkText: "View on map",
    },
    {
      title: "West Coast Office",
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      details: ["350 Townsend Street, #620,", "San Francisco, CA 94107"],
      link: "https://maps.google.com/?q=350+Townsend+Street+620+San+Francisco+CA+94107",
      linkText: "View on map",
    },
    {
      title: "Contact",
      icon: <Phone className="h-8 w-8 text-red-500" />,
      details: ["info@ascentconsults.com", "(404) 566-5855"],
      link: "mailto:info@ascentconsults.com",
      linkText: "Send an email",
    },
    {
      title: "Careers",
      icon: <Briefcase className="h-8 w-8 text-red-500" />,
      details: ["Interested in Joining Our Team?", ""],
      link: "/careers",
      linkText: "Apply Today!",
    },
  ]

  return (
    <section className="bg-black text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-start"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <div className="space-y-1 mb-3">
                {item.details.map((detail, i) => (
                  <p key={i} className="text-gray-400">
                    {detail}
                  </p>
                ))}
              </div>
              {item.link && (
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.link}
                    className="text-red-500 hover:text-red-400 flex items-center gap-1"
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.linkText}
                    <span className="text-xs">→</span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

