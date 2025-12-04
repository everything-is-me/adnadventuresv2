import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturedPackages from "@/components/featured-packages"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedPackages />
      <CallToAction />
      <Footer />
    </main>
  )
}
