"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  company: z.string().min(2, "Company name is required"),
  website: z.string().url().optional().or(z.literal("")),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  message: z.string().min(10, "Message is required"),
})

type FormData = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit form")
      }

      toast.success("Your message has been sent successfully!")
      reset()
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "Tanzania",
    "Kenya",
    "Uganda",
  ]

  return (
    <section className="bg-white text-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">We'd Love to Hear From You</h2>

            <p className="text-gray-400">
              If you're interested in learning more, fill out our contact form and we'll be in touch within 2 business
              days.
            </p>

            <div>
              <p className="text-gray-400">
                Not into forms?{" "}
                <Link href="/register" className="text-red-500 hover:text-red-400 underline">
                  Schedule a free consultation!
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input id="firstName" {...register("firstName")} className="bg-white border-slate-800" />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input id="lastName" {...register("lastName")} className="bg-white border-slate-800" />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input id="email" type="email" {...register("email")} className="bg-white border-slate-800" />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input id="phone" {...register("phone")} className="bg-white border-slate-800" />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name*</Label>
                  <Input id="company" {...register("company")} className="bg-white border-slate-800" />
                  {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input id="website" {...register("website")} className="bg-white border-slate-800" />
                  {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City*</Label>
                  <Input id="city" {...register("city")} className="bg-white border-slate-800" />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State*</Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("state", value)
                    }}
                  >
                    <SelectTrigger className="bg-white border-slate-800">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">How can we help you?*</Label>
                <Textarea id="message" {...register("message")} className="bg-white border-slate-800 min-h-[150px]" />
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-auto bg-red-600 hover:bg-red-700 text-white px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Your Message"}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-[400px] md:h-[500px] lg:h-full"
          >
            <div className="h-full flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-[4/3]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.PNG-gdQBYkkVK9QwZ1qc1WDZzWnG2If1w0.png"
                  alt="US map showing Ascent Consulting locations"
                  fill
                  className="object-contain"
                />

                {/* Animated locations */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute top-[43%] left-[16%] w-3 h-3 bg-red-500 rounded-full"
                />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="absolute top-[36%] right-[15%] w-3 h-3 bg-red-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

