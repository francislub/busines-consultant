"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  linkedinProfile: z.string().url("Valid LinkedIn URL is required"),
  position: z.enum(["consultant", "coordinator"]),
  locationAgreement: z.boolean().refine((val) => val === true, "You must agree to the location requirement"),
  resume: z.any(),
  coverLetter: z.any(),
  communicationConsent: z.boolean(),
  dataProcessingConsent: z.boolean().refine((val) => val === true, "You must agree to data processing"),
})

type FormData = z.infer<typeof formSchema>

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Handle form submission here
      console.log(data)
      toast.success("Application submitted successfully!")
    } catch (error) {
      toast.error("Error submitting application. Please try again.")
    }
    setIsSubmitting(false)
  }

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Submit your application</h2>
            <p className="text-gray-400">Please submit your cover letter and resume using this form.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name and Email */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} className="bg-gray-900 border-gray-800" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} className="bg-gray-900 border-gray-800" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Phone and Position */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex">
                  <Select defaultValue="US" className="w-20 bg-gray-900 border-gray-800">
                    <option value="US">+1</option>
                  </Select>
                  <Input id="phone" {...register("phone")} className="flex-1 ml-2 bg-gray-900 border-gray-800" />
                </div>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Position Desired</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="consultant" {...register("position")} value="consultant" />
                    <Label htmlFor="consultant">Construction Business Consultant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="coordinator" {...register("position")} value="coordinator" />
                    <Label htmlFor="coordinator">Project Coordinator</Label>
                  </div>
                </div>
              </div>

              {/* City and State */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} className="bg-gray-900 border-gray-800" />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select id="state" {...register("state")} className="w-full bg-gray-900 border-gray-800">
                  <option value="">Select State</option>
                  <option value="GA">Georgia</option>
                  {/* Add other states */}
                </Select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile Link</Label>
              <Input id="linkedin" {...register("linkedinProfile")} className="bg-gray-900 border-gray-800" />
              {errors.linkedinProfile && <p className="text-red-500 text-sm">{errors.linkedinProfile.message}</p>}
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resume">Resume Upload</Label>
                <Input
                  id="resume"
                  type="file"
                  {...register("resume")}
                  className="bg-gray-900 border-gray-800"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter Upload</Label>
                <Input
                  id="coverLetter"
                  type="file"
                  {...register("coverLetter")}
                  className="bg-gray-900 border-gray-800"
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="locationAgreement" {...register("locationAgreement")} />
                <Label htmlFor="locationAgreement">
                  I understand that I must work in / relocate to the Atlanta area for this position
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="communicationConsent" {...register("communicationConsent")} />
                <Label htmlFor="communicationConsent">
                  I agree to receive other communications from Ascent Consulting
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="dataProcessingConsent" {...register("dataProcessingConsent")} />
                <Label htmlFor="dataProcessingConsent">
                  I agree to allow Ascent Consulting to store and process my personal data
                </Label>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              This site is protected by reCAPTCHA Enterprise and the Google{" "}
              <a href="#" className="text-red-500 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-red-500 hover:underline">
                Terms of Service
              </a>{" "}
              apply.
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

