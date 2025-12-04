"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { TOUR_PACKAGES, PACKAGE_CATEGORIES } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Calendar, Filter, X } from "lucide-react"

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "popular">("popular")
  const [showFilters, setShowFilters] = useState(false)

  let filtered = TOUR_PACKAGES
  if (selectedCategory) {
    filtered = filtered.filter((pkg) => pkg.category === selectedCategory)
  }

  filtered.sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Explore Our <span className="gradient-text">Tour Packages</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Choose from our curated selection of travel experiences across India
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            {showFilters && (
              <div className="mt-4 p-4 bg-card border border-border rounded-lg">
                <button onClick={() => setShowFilters(false)} className="float-right">
                  <X className="w-5 h-5" />
                </button>
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            )}
          </div>

          {/* Packages Grid */}
          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No packages found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filtered.map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

interface FilterSidebarProps {
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
  sortBy: "price-low" | "price-high" | "popular"
  onSortChange: (sort: "price-low" | "price-high" | "popular") => void
}

function FilterSidebar({ selectedCategory, onSelectCategory, sortBy, onSortChange }: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === null ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
            }`}
          >
            All Packages
          </button>
          {Object.entries(PACKAGE_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => onSelectCategory(key)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === key ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-4">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: "popular" as const, label: "Most Popular" },
            { value: "price-low" as const, label: "Price: Low to High" },
            { value: "price-high" as const, label: "Price: High to Low" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                sortBy === option.value ? "bg-accent text-accent-foreground" : "hover:bg-muted text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">Price Range</p>
        <p className="text-lg font-semibold text-foreground">
          ₹{Math.min(...TOUR_PACKAGES.map((p) => p.price)).toLocaleString()} - ₹
          {Math.max(...TOUR_PACKAGES.map((p) => p.price)).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

interface PackageCardProps {
  package: (typeof TOUR_PACKAGES)[0]
}

function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Link href={`/packages/${pkg.id}`}>
      <div className="group cursor-pointer rounded-xl overflow-hidden bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={pkg.image || "/placeholder.svg"}
            alt={pkg.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {PACKAGE_CATEGORIES[pkg.category as keyof typeof PACKAGE_CATEGORIES]}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          {/* Title and Description */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
              {pkg.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
          </div>

          {/* Info */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-accent" />
              <span>{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{pkg.locations.join(", ")}</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold text-accent">₹{pkg.price.toLocaleString()}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
