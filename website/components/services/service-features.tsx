"use client"

import { motion } from "framer-motion"
import { Activity, BarChart, BookOpen, Briefcase, Calendar, CheckSquare, Gift, LineChart, PieChart, RefreshCw, Settings, Shield, Target, TrendingUp, User, Users } from 'lucide-react'

import { ServiceFeature } from "@/components/services/data"

interface ServiceFeaturesProps {
  features: ServiceFeature[]
  title?: string
  description?: string
}

export default function ServiceFeatures({ 
  features, 
  title = "Key Features & Benefits", 
  description = "Our comprehensive approach delivers these key advantages to your business"
}: ServiceFeaturesProps) {
  // Map icon names to Lucide React components
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "users": <Users className="h-6 w-6 text-red-600" />,
      "settings": <Settings className="h-6 w-6 text-red-600" />,
      "bar-chart": <BarChart className="h-6 w-6 text-red-600" />,
      "briefcase": <Briefcase className="h-6 w-6 text-red-600" />,
      "line-chart": <LineChart className="h-6 w-6 text-red-600" />,
      "target": <Target className="h-6 w-6 text-red-600" />,
      "trending-up": <TrendingUp className="h-6 w-6 text-red-600" />,
      "shield": <Shield className="h-6 w-6 text-red-600" />,
      "activity": <Activity className="h-6 w-6 text-red-600" />,
      "check-square": <CheckSquare className="h-6 w-6 text-red-600" />,
      "pie-chart": <PieChart className="h-6 w-6 text-red-600" />,
      "refresh-cw": <RefreshCw className="h-6 w-6 text-red-600" />,
      "user": <User className="h-6 w-6 text-red-600" />,
      "gift": <Gift className="h-6 w-6 text-red-600" />,
      "calendar": <Calendar className="h-6 w-6 text-red-600" />,
      "book": <BookOpen className="h-6 w-6 text-red-600" />,
    }
    
    return iconMap[iconName] || <Settings className="h-6 w-6 text-red-600" />
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 mb-4">
            Features & Benefits
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
            {title}
          </h2>
          <p className="text-lg text-slate-600">
            {description}
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
