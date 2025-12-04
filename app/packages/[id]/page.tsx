"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BookingForm from "@/components/booking-form"
import { TOUR_PACKAGES } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Calendar, Users, Check, Zap } from "lucide-react"

export default function PackageDetailPage() {
  const params = useParams()
  const id = Number.parseInt(params.id as string)
  const pkg = TOUR_PACKAGES.find((p) => p.id === id)
  const [showBookingForm, setShowBookingForm] = useState(false)

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Package Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">Sorry, we couldn't find the package you're looking for.</p>
          <Link
            href="/packages"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
          >
            Back to Packages
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const relatedPackages = TOUR_PACKAGES.filter((p) => p.category === pkg.category && p.id !== pkg.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg text-center">{pkg.title}</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-card border border-border rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold text-foreground">{pkg.duration}</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">Destinations</p>
                <p className="font-semibold text-foreground">{pkg.locations.length}</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="font-semibold text-foreground">4.8/5</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">About This Package</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">{pkg.description}</p>
              <p className="text-muted-foreground leading-relaxed">
                Experience the best of {pkg.title.split("-")[0]} with our expertly curated itinerary. Our local guides,
                comfortable accommodations, and included meals ensure an unforgettable journey through some of India's
                most stunning landscapes.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Itinerary</h2>
              <div className="space-y-4">
                {Array.from({ length: Number.parseInt(pkg.duration.split(" ")[0]) }).map((_, i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">
                      Day {i + 1} - {pkg.locations[i % pkg.locations.length]}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Explore the magnificent sights and immerse yourself in the local culture and traditions of this
                      wonderful destination.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Accommodation at premium hotels",
                  "Daily breakfast & dinner",
                  "Professional tour guide",
                  "All transportation during tour",
                  "Entrance fees to monuments",
                  "Travel insurance coverage",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <Check className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Highlights</h2>
              <div className="space-y-3">
                {pkg.locations.map((location, i) => (
                  <div key={i} className="flex gap-3">
                    <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{location} - immersive local experience</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-8 space-y-6">
              {/* Price */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Price per person</p>
                <div className="text-4xl font-bold text-accent">₹{pkg.price.toLocaleString()}</div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 pb-6 border-b border-border">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(847 reviews)</span>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold text-foreground">{pkg.duration}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Destinations</p>
                    <p className="font-semibold text-foreground">{pkg.locations.join(", ")}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Group Size</p>
                    <p className="font-semibold text-foreground">2-15 people</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
              >
                Book Now
              </button>
              <button className="w-full py-3 bg-card text-foreground border border-border rounded-lg font-semibold hover:bg-muted transition-all">
                Contact Us
              </button>
            </div>

            {/* Booking Form - shown when expanded */}
            {showBookingForm && (
              <div className="mt-6">
                <BookingForm packageId={pkg.id} packageTitle={pkg.title} />
              </div>
            )}
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Similar <span className="gradient-text">Packages</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPackages.map((relPkg) => (
                <Link key={relPkg.id} href={`/packages/${relPkg.id}`}>
                  <div className="group cursor-pointer rounded-xl overflow-hidden bg-card border border-border hover:border-accent transition-all hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relPkg.image || "/placeholder.svg"}
                        alt={relPkg.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {relPkg.title}
                      </h3>
                      <p className="text-accent font-bold mb-2">₹{relPkg.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{relPkg.duration}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
