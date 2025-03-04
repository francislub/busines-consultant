import HeroBanner from "@/components/business-coaches/hero-banner"
import ComparisonSection from "@/components/business-coaches/comparison-section"
import CoachingSection from "@/components/business-coaches/coaching-section"

export default function BusinessCoaches() {
  return (
    <main className="min-h-screen bg-black">
      <HeroBanner />
      <ComparisonSection />
      <CoachingSection />
    </main>
  )
}

