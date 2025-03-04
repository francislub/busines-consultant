import HeroBanner from "@/components/clients/hero-banner"
import ClientGrid from "@/components/clients/client-grid"
import TestimonialSection from "@/components/clients/testimonial-section"

export default function Clients() {
  return (
    <main className="min-h-screen bg-black">
      <HeroBanner />
      <ClientGrid />
      <TestimonialSection />
    </main>
  )
}

