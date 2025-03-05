import WhoWeAre from "@/components/whatwedo/who-we-are"
import OurStory from "@/components/whatwedo/our-story"
import OurPurpose from "@/components/whatwedo/our-purpose"
import CoreValues from "@/components/whatwedo/core-values"
import CoreTeam from "@/components/whatwedo/core-team"

export default function WhatWeDo() {
  return (
    <main className="min-h-screen ">
      <WhoWeAre />
      <OurStory />
      <OurPurpose />
      <CoreValues />
      <CoreTeam />
    </main>
  )
}

