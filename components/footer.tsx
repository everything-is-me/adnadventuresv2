"use client"
import Link from "next/link"
import { useLanguage } from "@/providers/language-provider"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="font-bold text-foreground">ADN Adventures</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover the magic of India with expertly curated travel experiences.
            </p>
            <div className="flex gap-4 mt-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <button key={i} className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Packages", href: "/packages" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {[
                { label: "FAQ", href: "#" },
                { label: "Contact Us", href: "#" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "#" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+91 (0) 1234 567 890</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">info@adnadventures.com</span>
              </li>
              <li className="flex gap-2">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {currentYear} ADN Adventures. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
