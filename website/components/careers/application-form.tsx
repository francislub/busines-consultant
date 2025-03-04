"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

type FormData = {
  name: string
  email: string
  phone: string
  city: string
  state: string
  linkedinProfile: string
  position: string
  locationAgreement: boolean
  resume: FileList | null
  coverLetter: FileList | null
  communicationConsent: boolean
  dataProcessingConsent: boolean
}

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
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
                <Input
                  id="name"
                  {...register("name", { required: "Name is required", minLength: 2 })}
                  className="bg-gray-900 border-gray-800"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email address" } })}
                  className="bg-gray-900 border-gray-800"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Phone and Position */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register("phone", { required: "Valid phone number is required", minLength: 10 })}
                  className="bg-gray-900 border-gray-800"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Position Desired</Label>
                <select {...register("position", { required: "Position is required" })} className="w-full bg-gray-900 border-gray-800">
                  <option value="">Select Position</option>
                  <option value="consultant">Construction Business Consultant</option>
                  <option value="coordinator">Project Coordinator</option>
                </select>
                {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
              </div>

              {/* City and State */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  {...register("city", { required: "City is required", minLength: 2 })}
                  className="bg-gray-900 border-gray-800"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <select {...register("state", { required: "State is required" })} className="w-full bg-gray-900 border-gray-800">
                  <option value="">Select State</option>
                  <option value="GA">Georgia</option>
                  {/* Add other states */}
                </select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile Link</Label>
              <Input
                id="linkedin"
                {...register("linkedinProfile", { required: "Valid LinkedIn URL is required", pattern: { value: /^https?:\/\/(www\.)?linkedin\.com\/.*$/, message: "Invalid LinkedIn URL" } })}
                className="bg-gray-900 border-gray-800"
              />
              {errors.linkedinProfile && <p className="text-red-500 text-sm">{errors.linkedinProfile.message}</p>}
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resume">Resume Upload</Label>
                <Input id="resume" type="file" {...register("resume", { required: "Resume is required" })} className="bg-gray-900 border-gray-800" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter Upload</Label>
                <Input id="coverLetter" type="file" {...register("coverLetter")} className="bg-gray-900 border-gray-800" />
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="locationAgreement" {...register("locationAgreement", { required: "You must agree to the location requirement" })} />
                <Label htmlFor="locationAgreement">I understand that I must work in the Atlanta area</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="communicationConsent" {...register("communicationConsent")} />
                <Label htmlFor="communicationConsent">I agree to receive communications</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="dataProcessingConsent" {...register("dataProcessingConsent", { required: "You must agree to data processing" })} />
                <Label htmlFor="dataProcessingConsent">I agree to data processing</Label>
              </div>
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
