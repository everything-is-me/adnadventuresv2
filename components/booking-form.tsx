"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/providers/language-provider"

interface BookingFormProps {
  packageId: number
  packageTitle: string
}

export default function BookingForm({ packageId, packageTitle }: BookingFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "1",
    specialRequests: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageId,
          packageTitle,
        }),
      })

      if (!response.ok) {
        throw new Error("Booking failed. Please try again.")
      }

      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        guests: "1",
        specialRequests: "",
      })

      // Reset form after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 text-center space-y-4">
        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">✓</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground">{t("confirmation.title")}</h3>
        <p className="text-muted-foreground">{t("confirmation.message")}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-semibold text-foreground mb-6">{t("booking.title")}</h3>

      {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">{t("booking.name")}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">{t("booking.email")}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="your@email.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">{t("booking.phone")}</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="+91 XXXXX XXXXX"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">{t("booking.date")}</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Number of Guests */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">{t("booking.guests")}</label>
        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Special Requests (Optional)</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          placeholder="Any special dietary requirements or preferences?"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
      >
        {loading ? "Processing..." : t("booking.submit")}
      </button>
    </form>
  )
}
