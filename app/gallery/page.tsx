"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { Star, X } from "lucide-react"

const GALLERY_IMAGES = [
  { id: 1, src: "/kerala-backwaters-houseboat.png", alt: "Kerala Backwaters", category: "beach" },
  { id: 2, src: "/taj-mahal-agra-palace.jpg", alt: "Taj Mahal", category: "heritage" },
  { id: 3, src: "/himalayan-mountains-trek.jpg", alt: "Himalayan Trek", category: "mountain" },
  { id: 4, src: "/goa-beach-sunset.jpg", alt: "Goa Beach Sunset", category: "beach" },
  { id: 5, src: "/kashmir-dal-lake-mountains.jpg", alt: "Kashmir Dal Lake", category: "mountain" },
  { id: 6, src: "/tiger-safari-ranthambore.jpg", alt: "Tiger Safari", category: "wildlife" },
  { id: 7, src: "/placeholder.svg?key=m3x4s", alt: "Indian Temple", category: "heritage" },
  { id: 8, src: "/placeholder.svg?key=n7q2w", alt: "Desert Landscape", category: "adventure" },
  { id: 9, src: "/placeholder.svg?key=p9r5t", alt: "Spice Market", category: "cultural" },
]

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Mumbai, India",
    rating: 5,
    text: "ADN Adventures made our Rajasthan trip absolutely unforgettable! The guides were knowledgeable and the accommodations were excellent. Highly recommended!",
    image: "/profile-photo-1.jpg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 5,
    text: "Best travel experience of my life! From Kerala backwaters to Kashmir mountains, every moment was magical. ADN Adventures truly delivers excellence.",
    image: "/profile-photo-2.jpg",
  },
  {
    id: 3,
    name: "Maria González",
    location: "Madrid, Spain",
    rating: 5,
    text: "The Kashmir package was breathtaking. Professional team, comfortable travel, and authentic cultural experiences. Worth every penny!",
    image: "/profile-photo-3.jpg",
  },
  {
    id: 4,
    name: "James Chen",
    location: "Singapore",
    rating: 4,
    text: "Great organization and wonderful experiences. The Goa beach package was perfect for relaxation. Looking forward to the next trip!",
    image: "/profile-photo-4.jpg",
  },
  {
    id: 5,
    name: "Priya Sharma",
    location: "Delhi, India",
    rating: 5,
    text: "As an Indian, I was surprised by how much I learned about my own country! ADN Adventures made me see India with fresh eyes.",
    image: "/profile-photo-5.jpg",
  },
  {
    id: 6,
    name: "Marco Rossi",
    location: "Rome, Italy",
    rating: 5,
    text: "The wildlife safari in Ranthambore was incredible! Spotted tigers, excellent guides, and perfectly organized. This team knows what they're doing!",
    image: "/profile-photo-6.jpg",
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredImages = selectedCategory
    ? GALLERY_IMAGES.filter((img) => img.category === selectedCategory)
    : GALLERY_IMAGES

  const categories = ["all", ...Array.from(new Set(GALLERY_IMAGES.map((img) => img.category)))]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Gallery & <span className="gradient-text">Testimonials</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore stunning moments from our travelers and see what makes ADN Adventures special
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Gallery</h2>

          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "all" ? null : category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${
                  (category === "all" && selectedCategory === null) || selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:border-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image.id)}
                className={`cursor-pointer rounded-lg overflow-hidden group relative ${
                  index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div className="relative w-full h-80 overflow-hidden bg-muted">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-lg">+</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="p-3 bg-card text-foreground text-sm font-medium">{image.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <ImageLightbox
          image={GALLERY_IMAGES.find((img) => img.id === selectedImage)!}
          onClose={() => setSelectedImage(null)}
          onNext={() => {
            const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
            if (currentIndex < filteredImages.length - 1) {
              setSelectedImage(filteredImages[currentIndex + 1].id)
            }
          }}
          onPrev={() => {
            const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
            if (currentIndex > 0) {
              setSelectedImage(filteredImages[currentIndex - 1].id)
            }
          }}
        />
      )}

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Our <span className="gradient-text">Travelers Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from real travelers who've explored India with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-8 bg-background border border-border rounded-xl hover:border-accent transition-all duration-300 hover:shadow-lg"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? "fill-accent text-accent" : "text-border"}`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border border-border rounded-xl text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">Google Reviews & Ratings</h3>
            <p className="text-muted-foreground mb-4">
              Our travelers have given us an average rating of 4.8/5 stars on Google
            </p>
            <a
              href="https://www.google.com/search?q=ADN+Adventures+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              View on Google
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

interface ImageLightboxProps {
  image: (typeof GALLERY_IMAGES)[0]
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function ImageLightbox({ image, onClose, onNext, onPrev }: ImageLightboxProps) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full h-full">
          <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-contain" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Navigation Buttons */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur"
          aria-label="Previous"
        >
          <span className="text-white text-xl">‹</span>
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur"
          aria-label="Next"
        >
          <span className="text-white text-xl">›</span>
        </button>

        {/* Image Info */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center backdrop-blur bg-black/20 px-4 py-2 rounded-lg">
          <p className="font-semibold">{image.alt}</p>
        </div>
      </div>
    </div>
  )
}
