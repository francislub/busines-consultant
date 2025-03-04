import HeroBanner from "@/components/careers/hero-banner"
import OpenPositions from "@/components/careers/open-positions"
import ApplicationForm from "@/components/careers/application-form"

export default function Careers() {
  return (
    <main className="min-h-screen bg-black">
      <HeroBanner />
      <OpenPositions />
      <ApplicationForm />
    </main>
  )
}

