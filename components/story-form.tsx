"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
// import { ImageUpload } from "@/components/image-upload"
import { Loader2 } from 'lucide-react'

const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("A valid image URL is required"),
})

type StoryFormValues = z.infer<typeof storySchema>

interface StoryFormProps {
  initialData?: StoryFormValues
  onSubmit: (data: StoryFormValues) => void
  isSubmitting: boolean
}

export function StoryForm({ initialData, onSubmit, isSubmitting }: StoryFormProps) {
  const [setImage] = useState(initialData?.image || "")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StoryFormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      image: "",
    },
  })

  const onImageChange = (url?: string) => {
    if (url) {
      setValue("image", url, { shouldValidate: true })
      setImage(url)
    }
  }

  const onFormSubmit = (data: StoryFormValues) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter story title"
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter story description"
          rows={5}
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Image</Label>
        {/* <ImageUpload
          value={image}
          onChange={onImageChange}
          disabled={isSubmitting}
        /> */}
        {errors.image && (
          <p className="text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {initialData ? "Updating..." : "Creating..."}
          </>
        ) : (
          <>{initialData ? "Update Story" : "Create Story"}</>
        )}
      </Button>
    </form>
  )
}
