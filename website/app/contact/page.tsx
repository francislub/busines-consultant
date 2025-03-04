import HeroBanner from "@/components/contact/hero-banner"
import ContactInfo from "@/components/contact/contact-info"
import ContactForm from "@/components/contact/contact-form"

export default function Contact() {
  return (
    <main className="min-h-screen bg-black">
      <HeroBanner />
      <ContactInfo />
      <ContactForm />
    </main>
  )
}

