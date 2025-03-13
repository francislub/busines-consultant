import ResourcesSection from "@/components/resources-section"
import LatestArticles from "@/components/latest-articles"
import SuccessStories from "@/components/success-stories"
import BookConsultation from "@/components/book-consultation"
import WhatWeDo from "@/components/what-we-do"
import BusinessCTA from "@/components/business-cta"
import Hero from "@/components/hero"
import React from 'react'

export default function Home() {
  return (
    <div>
      <Hero/>
      <WhatWeDo/>
      <BusinessCTA />
      <SuccessStories />
      <ResourcesSection />
      <LatestArticles />
      <BookConsultation />
    </div>
  );
}
