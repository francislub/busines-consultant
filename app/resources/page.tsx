import HeroBanner from "@/components/resources/hero-banner"
import TemplateDownloads from "@/components/resources/template-download"
import ConsultationCTA from "@/components/resources/consultation-cta"

export default function Resources() {
  return (
    <main className="min-h-screen bg-black">
      <HeroBanner />
      <TemplateDownloads />
      <ConsultationCTA />
    </main>
  )
}

