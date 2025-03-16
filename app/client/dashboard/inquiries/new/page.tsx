"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import ClientLayout from "@/components/client-layout"
import { toast } from "sonner"

// Define form schema
const inquirySchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

type InquiryFormValues = z.infer<typeof inquirySchema>

export default function NewInquiryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/client/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      toast.success("Inquiry submitted successfully")
      router.push("/client/dashboard")
    } catch (error) {
      console.error("Error submitting inquiry:", error)
      toast.error("Failed to submit inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ClientLayout>
      <div className="container mx-auto py-10 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Submit a New Inquiry</CardTitle>
            <CardDescription>
              Let us know what you need help with and our team will get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your inquiry" {...register("subject")} />
                {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your inquiry..."
                  rows={6}
                  {...register("message")}
                />
                {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ClientLayout>
  )
}

