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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import ClientLayout from "@/components/client-layout"
import { toast } from "sonner"

// Define form schema
const consultationSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  date: z
    .date({
      required_error: "Please select a date",
    })
    .refine((date) => date > new Date(), {
      message: "Date must be in the future",
    }),
})

type ConsultationFormValues = z.infer<typeof consultationSchema>

export default function ScheduleConsultationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  })

  const selectedDate = watch("date")

  const onSubmit = async (data: ConsultationFormValues) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/client/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          date: data.date.toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to schedule consultation")
      }

      toast.success("Consultation scheduled successfully")
      router.push("/client/dashboard")
    } catch (error) {
      console.error("Error scheduling consultation:", error)
      toast.error("Failed to schedule consultation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ClientLayout>
      <div className="container mx-auto py-10 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Schedule a Consultation</CardTitle>
            <CardDescription>
              Book a time to speak with one of our consultants about your business needs.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of the consultation topic"
                  {...register("subject")}
                />
                {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide details about what you'd like to discuss..."
                  rows={4}
                  {...register("description")}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Preferred Date and Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setValue("date", date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
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
                    Scheduling...
                  </>
                ) : (
                  "Schedule Consultation"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ClientLayout>
  )
}

