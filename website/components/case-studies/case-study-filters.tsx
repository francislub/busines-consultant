"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { industries, services, type Industry, type Service } from "./data"

interface CaseStudyFiltersProps {
  industryFilter: Industry | "All"
  serviceFilter: Service | "All"
  onFilterChange: (industry: Industry | "All", service: Service | "All") => void
  className?: string
}

export default function CaseStudyFilters({
  industryFilter,
  serviceFilter,
  onFilterChange,
  className,
}: CaseStudyFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  const resetFilters = () => {
    onFilterChange("All", "All")
  }

  const isFiltered = industryFilter !== "All" || serviceFilter !== "All"

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters {isFiltered && "(Active)"}
          </Button>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-sm text-red-600 hover:text-red-700"
            >
              <X className="h-3 w-3 mr-1" />
              Clear filters
            </Button>
          )}
        </div>
        <div className="text-sm text-slate-500">{isFiltered ? "Filtered results" : "Showing all case studies"}</div>
      </div>

      <motion.div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 rounded-lg p-4 mb-8",
          !filtersOpen && "hidden md:grid",
        )}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: filtersOpen || window.innerWidth >= 768 ? "auto" : 0,
          opacity: filtersOpen || window.innerWidth >= 768 ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-2">
          <Label htmlFor="industry-filter">Filter by Industry</Label>
          <Select
            value={industryFilter}
            onValueChange={(value) => onFilterChange(value as Industry | "All", serviceFilter)}
          >
            <SelectTrigger id="industry-filter">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="service-filter">Filter by Service</Label>
          <Select
            value={serviceFilter}
            onValueChange={(value) => onFilterChange(industryFilter, value as Service | "All")}
          >
            <SelectTrigger id="service-filter">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Services</SelectItem>
              {services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>
    </div>
  )
}

