import { AboutSection } from "@/app/_components/about-section"
import { HeroSection } from "@/app/_components/hero-section"
import { Shell } from "@/app/_components/shell"
import { WorksSection } from "@/app/_components/works-section"

export default function Page() {
  return (
    <Shell>
      <HeroSection />
      <WorksSection />
      <AboutSection />
    </Shell>
  )
}
