"use client"
import Link from "next/link"
import { useLanguage } from "@/providers/language-provider"

export default function CallToAction() {
  const { t } = useLanguage()

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-y border-border">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of travelers who've explored India's most beautiful destinations with ADN Adventures.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/packages"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
          >
            {t("booking.title")}
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-8 py-3 bg-card text-foreground border border-border rounded-lg font-semibold hover:bg-muted transition-all"
          >
            View Gallery
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">50K+</div>
            <p className="text-sm text-muted-foreground">Happy Travelers</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">12</div>
            <p className="text-sm text-muted-foreground">Indian States</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">100+</div>
            <p className="text-sm text-muted-foreground">Tour Packages</p>
          </div>
        </div>
      </div>
    </section>
  )
}
