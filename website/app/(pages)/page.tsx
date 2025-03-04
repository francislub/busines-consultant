import ResourcesSection from "@/components/resources-section"
import LatestArticles from "@/components/latest-articles"
import SuccessStories from "@/components/success-stories"
import BookConsultation from "@/components/book-consultation"
import WhatWeDo from "@/components/what-we-do"
import HeroBanner from "@/components/hero-banner"
import BusinessCTA from "@/components/business-cta"
import PhotoGallery from "@/components/photo-gallery"
import Hero from "@/components/hero"
import React from 'react'

export default function Home() {
  return (
    <div>
      <Hero/>
      <WhatWeDo/>
      <HeroBanner />
      <BusinessCTA />
      <PhotoGallery />
      <SuccessStories />
      <ResourcesSection />
      <LatestArticles />
      <BookConsultation />
    </div>
  );
}
