"use client"

import React, { useState, useEffect } from "react"

export type Language = "en" | "hi" | "es" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export const LanguageContext = React.createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.packages": "Packages",
    "nav.gallery": "Gallery",
    "nav.testimonials": "Testimonials",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.terms": "Terms & Conditions",
    "hero.title": "Discover India",
    "hero.subtitle": "From the pristine beaches of Kanyakumari to the snow-capped peaks of Kashmir",
    "hero.cta": "Explore Packages",
    "footer.copyright": "© 2025 ADN Adventures. All rights reserved.",
    "booking.title": "Book Your Adventure",
    "booking.name": "Full Name",
    "booking.email": "Email Address",
    "booking.phone": "Phone Number",
    "booking.package": "Select Package",
    "booking.date": "Preferred Date",
    "booking.guests": "Number of Guests",
    "booking.submit": "Book Now",
    "confirmation.title": "Booking Confirmed",
    "confirmation.message": "Your booking has been confirmed. Check your email for details.",
  },
  hi: {
    "nav.home": "होम",
    "nav.packages": "पैकेज",
    "nav.gallery": "गैलरी",
    "nav.testimonials": "प्रशंसापत्र",
    "nav.about": "परिचय",
    "nav.contact": "संपर्क",
    "nav.terms": "नियम और शर्तें",
    "hero.title": "भारत की खोज करें",
    "hero.subtitle": "कन्याकुमारी के सुंदर समुद्र तटों से लेकर कश्मीर की बर्फीली चोटियों तक",
    "hero.cta": "पैकेज देखें",
    "footer.copyright": "© 2025 ADN Adventures. सर्वाधिकार सुरक्षित।",
    "booking.title": "अपने साहस को बुक करें",
    "booking.name": "पूरा नाम",
    "booking.email": "ईमेल पता",
    "booking.phone": "फोन नंबर",
    "booking.package": "पैकेज चुनें",
    "booking.date": "पसंदीदा तारीख",
    "booking.guests": "मेहमानों की संख्या",
    "booking.submit": "अभी बुक करें",
    "confirmation.title": "बुकिंग की पुष्टि",
    "confirmation.message": "आपकी बुकिंग की पुष्टि हो गई है। विवरण के लिए अपना ईमेल देखें।",
  },
  es: {
    "nav.home": "Inicio",
    "nav.packages": "Paquetes",
    "nav.gallery": "Galería",
    "nav.testimonials": "Testimonios",
    "nav.about": "Acerca de",
    "nav.contact": "Contacto",
    "nav.terms": "Términos y Condiciones",
    "hero.title": "Descubre India",
    "hero.subtitle": "Desde las playas vírgenes de Kanyakumari hasta los picos nevados de Cachemira",
    "hero.cta": "Explorar Paquetes",
    "footer.copyright": "© 2025 ADN Adventures. Todos los derechos reservados.",
    "booking.title": "Reserva tu Aventura",
    "booking.name": "Nombre Completo",
    "booking.email": "Correo Electrónico",
    "booking.phone": "Número de Teléfono",
    "booking.package": "Seleccionar Paquete",
    "booking.date": "Fecha Preferida",
    "booking.guests": "Número de Huéspedes",
    "booking.submit": "Reservar Ahora",
    "confirmation.title": "Reserva Confirmada",
    "confirmation.message": "Tu reserva ha sido confirmada. Revisa tu correo para más detalles.",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.packages": "Forfaits",
    "nav.gallery": "Galerie",
    "nav.testimonials": "Témoignages",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.terms": "Conditions Générales",
    "hero.title": "Découvrez l'Inde",
    "hero.subtitle": "Des plages immaculées de Kanyakumari aux sommets enneigés du Cachemire",
    "hero.cta": "Explorer les Forfaits",
    "footer.copyright": "© 2025 ADN Adventures. Tous droits réservés.",
    "booking.title": "Réservez votre Aventure",
    "booking.name": "Nom Complet",
    "booking.email": "Adresse Email",
    "booking.phone": "Numéro de Téléphone",
    "booking.package": "Sélectionner un Forfait",
    "booking.date": "Date Préférée",
    "booking.guests": "Nombre de Voyageurs",
    "booking.submit": "Réserver Maintenant",
    "confirmation.title": "Réservation Confirmée",
    "confirmation.message": "Votre réservation a été confirmée. Vérifiez votre email pour plus de détails.",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("language") as Language | null
    if (saved && Object.keys(translations).includes(saved)) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return React.useContext(LanguageContext)
}
