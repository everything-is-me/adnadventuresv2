"use client"
import Link from "next/link"
import { useLanguage } from "@/providers/language-provider"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Video Background - using a high-quality placeholder */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/india-landscapes-kashmir-kanyakumari.jpg"
        >
          {/* Fallback image if video doesn't load */}
          <source src="/india-landscapes-kashmir-kanyakumari.jpg" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg leading-tight">
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/90 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all transform hover:scale-105 shadow-lg"
            >
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/40 backdrop-blur">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
