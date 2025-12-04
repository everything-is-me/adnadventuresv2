"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/providers/language-provider"
import { ChevronDown } from "lucide-react"

const TERMS_CONTENT = {
  en: {
    title: "Terms, Conditions & Policies",
    sections: [
      {
        id: "booking",
        title: "Booking Terms & Conditions",
        content: `
          <h3>1.1 Booking Confirmation</h3>
          <p>A booking is considered confirmed only after payment is received and a confirmation email is sent to the customer. Verbal commitments or provisional bookings are not binding.</p>
          
          <h3>1.2 Payment Terms</h3>
          <p>We accept all major credit cards, debit cards, and bank transfers. A minimum deposit of 25% is required at the time of booking, with the remaining balance due 30 days before the travel date.</p>
          
          <h3>1.3 Cancellation Policy</h3>
          <p>Cancellations made 60+ days before travel: Full refund minus processing fees (5%). Cancellations 30-59 days: 50% refund. Cancellations less than 30 days: No refund. Special packages may have different policies.</p>
          
          <h3>1.4 Modification of Tour Dates</h3>
          <p>Changes to tour dates are subject to availability and must be requested at least 30 days in advance. A modification fee of ₹2,000 will apply.</p>
        `,
      },
      {
        id: "liability",
        title: "Liability & Responsibility",
        content: `
          <h3>2.1 ADN Adventures Responsibility</h3>
          <p>ADN Adventures is responsible for arranging accommodations, transportation, guides, and activities as per the itinerary. We are not responsible for any changes due to unforeseen circumstances, natural disasters, or government restrictions.</p>
          
          <h3>2.2 Customer Responsibility</h3>
          <p>Customers are responsible for ensuring they have valid passports, visas, and travel insurance. ADN Adventures is not liable for any issues arising from expired or invalid documentation.</p>
          
          <h3>2.3 Personal Safety</h3>
          <p>While we take all precautions for customer safety, adventurous activities carry inherent risks. Customers participate at their own risk and are advised to purchase travel insurance covering medical emergencies.</p>
          
          <h3>2.4 Limitation of Liability</h3>
          <p>ADN Adventures' liability is limited to the total amount paid for the tour package. We are not liable for indirect, consequential, or incidental damages.</p>
        `,
      },
      {
        id: "insurance",
        title: "Travel Insurance & Medical",
        content: `
          <h3>3.1 Travel Insurance</h3>
          <p>We strongly recommend purchasing comprehensive travel insurance that covers trip cancellation, medical emergencies, and evacuation. Insurance is available at the time of booking.</p>
          
          <h3>3.2 Medical Fitness</h3>
          <p>Customers with pre-existing medical conditions should consult their doctors before booking adventure tours. Certain activities may not be suitable for individuals with specific health conditions.</p>
          
          <h3>3.3 COVID-19 & Health Protocols</h3>
          <p>We follow all government guidelines regarding health protocols. Customers must be fully vaccinated as per current regulations. Refunds or alternatives are available if travel is not possible due to health emergencies.</p>
        `,
      },
      {
        id: "privacy",
        title: "Privacy Policy",
        content: `
          <h3>4.1 Data Collection</h3>
          <p>We collect personal information necessary for booking, communication, and payment processing. This includes name, email, phone number, and payment details.</p>
          
          <h3>4.2 Data Protection</h3>
          <p>All personal data is encrypted and stored securely. We do not share your information with third parties without explicit consent, except for payment processors and accommodation providers.</p>
          
          <h3>4.3 Marketing Communications</h3>
          <p>By signing up, you may receive promotional emails and offers from ADN Adventures. You can unsubscribe at any time using the link in our emails.</p>
          
          <h3>4.4 Cookie Policy</h3>
          <p>Our website uses cookies to improve user experience and track analytics. You can disable cookies in your browser settings.</p>
        `,
      },
      {
        id: "refund",
        title: "Refund & Compensation Policy",
        content: `
          <h3>5.1 Full Refund Eligible</h3>
          <p>Full refunds (minus 5% processing fee) are provided if tours are cancelled by ADN Adventures due to insufficient bookings or unforeseen circumstances.</p>
          
          <h3>5.2 Partial Refund</h3>
          <p>Partial refunds are issued for unused services (e.g., missed meals, activities not undertaken). Refunds are processed within 7-10 working days.</p>
          
          <h3>5.3 Refund Method</h3>
          <p>Refunds are credited to the original payment method. Bank transfers may take 5-7 working days to appear in your account.</p>
          
          <h3>5.4 Disputes</h3>
          <p>Any disputes regarding refunds must be reported within 30 days of tour completion. Our team will investigate and provide a resolution.</p>
        `,
      },
      {
        id: "conduct",
        title: "Code of Conduct",
        content: `
          <h3>6.1 Respectful Behavior</h3>
          <p>Customers are expected to respect local cultures, traditions, and the environment. Disruptive or disrespectful behavior may result in expulsion from the tour without refund.</p>
          
          <h3>6.2 Substance Policy</h3>
          <p>The use of illegal drugs is strictly prohibited. Excessive alcohol consumption that affects group activities is not tolerated.</p>
          
          <h3>6.3 Environmental Responsibility</h3>
          <p>We encourage responsible tourism. Customers must follow Leave No Trace principles and respect wildlife and natural habitats.</p>
          
          <h3>6.4 Photography Rights</h3>
          <p>Customers may photograph for personal use. Commercial photography requires written permission from ADN Adventures.</p>
        `,
      },
    ],
  },
  hi: {
    title: "नियम, शर्तें और नीतियां",
    sections: [
      {
        id: "booking",
        title: "बुकिंग नियम और शर्तें",
        content: `
          <h3>1.1 बुकिंग की पुष्टि</h3>
          <p>बुकिंग तभी पुष्टि की जाती है जब भुगतान प्राप्त हो और पुष्टि ईमेल भेजा जाए। मौखिक प्रतिबद्धताएं बाध्यकारी नहीं हैं।</p>
          
          <h3>1.2 भुगतान की शर्तें</h3>
          <p>हम सभी प्रमुख क्रेडिट कार्ड, डेबिट कार्ड और बैंक हस्तांतरण स्वीकार करते हैं। बुकिंग के समय 25% न्यूनतम जमा आवश्यक है।</p>
        `,
      },
      {
        id: "liability",
        title: "दायित्व और जिम्मेदारी",
        content: `
          <h3>2.1 ADN Adventures की जिम्मेदारी</h3>
          <p>ADN Adventures आवास, परिवहन और गतिविधियों की व्यवस्था के लिए जिम्मेदार है।</p>
        `,
      },
      {
        id: "insurance",
        title: "यात्रा बीमा और चिकित्सा",
        content: `
          <h3>3.1 यात्रा बीमा</h3>
          <p>हम व्यापक यात्रा बीमा की सलाह देते हैं जो आपातकालीन स्थितियों को कवर करता है।</p>
        `,
      },
      {
        id: "privacy",
        title: "गोपनीयता नीति",
        content: `
          <h3>4.1 डेटा संग्रह</h3>
          <p>हम बुकिंग, संचार और भुगतान के लिए आवश्यक व्यक्तिगत जानकारी एकत्र करते हैं।</p>
        `,
      },
      {
        id: "refund",
        title: "धनवापसी नीति",
        content: `
          <h3>5.1 पूर्ण धनवापसी</h3>
          <p>यदि ADN Adventures द्वारा दौरे रद्द किए जाते हैं तो पूर्ण धनवापसी प्रदान की जाती है।</p>
        `,
      },
      {
        id: "conduct",
        title: "आचरण संहिता",
        content: `
          <h3>6.1 सम्मानपूर्ण व्यवहार</h3>
          <p>ग्राहकों से अपेक्षा की जाती है कि वे स्थानीय संस्कृति और परंपराओं का सम्मान करें।</p>
        `,
      },
    ],
  },
  es: {
    title: "Términos, Condiciones y Políticas",
    sections: [
      {
        id: "booking",
        title: "Términos y Condiciones de Reserva",
        content: `
          <h3>1.1 Confirmación de Reserva</h3>
          <p>Una reserva se confirma solo después de recibir el pago y enviar un correo de confirmación.</p>
          
          <h3>1.2 Términos de Pago</h3>
          <p>Aceptamos todas las tarjetas de crédito principales y transferencias bancarias. Se requiere un depósito mínimo del 25% al momento de la reserva.</p>
        `,
      },
      {
        id: "liability",
        title: "Responsabilidad y Limitación",
        content: `
          <h3>2.1 Responsabilidad de ADN Adventures</h3>
          <p>ADN Adventures es responsable de organizar alojamiento, transporte y actividades según el itinerario.</p>
        `,
      },
      {
        id: "insurance",
        title: "Seguro de Viaje y Médico",
        content: `
          <h3>3.1 Seguro de Viaje</h3>
          <p>Recomendamos comprar un seguro de viaje integral que cubra emergencias médicas.</p>
        `,
      },
      {
        id: "privacy",
        title: "Política de Privacidad",
        content: `
          <h3>4.1 Recopilación de Datos</h3>
          <p>Recopilamos información personal necesaria para reservas y procesamiento de pagos.</p>
        `,
      },
      {
        id: "refund",
        title: "Política de Reembolso",
        content: `
          <h3>5.1 Reembolso Completo</h3>
          <p>Se proporcionan reembolsos completos si ADN Adventures cancela tours por circunstancias imprevistas.</p>
        `,
      },
      {
        id: "conduct",
        title: "Código de Conducta",
        content: `
          <h3>6.1 Comportamiento Respetuoso</h3>
          <p>Se espera que los clientes respeten las culturas y tradiciones locales.</p>
        `,
      },
    ],
  },
  fr: {
    title: "Conditions Générales et Politiques",
    sections: [
      {
        id: "booking",
        title: "Conditions de Réservation",
        content: `
          <h3>1.1 Confirmation de Réservation</h3>
          <p>Une réservation n'est confirmée que après réception du paiement et envoi d'un e-mail de confirmation.</p>
          
          <h3>1.2 Modalités de Paiement</h3>
          <p>Nous acceptons toutes les cartes de crédit principales et les virements bancaires. Un dépôt minimum de 25% est requis.</p>
        `,
      },
      {
        id: "liability",
        title: "Responsabilité",
        content: `
          <h3>2.1 Responsabilité d'ADN Adventures</h3>
          <p>ADN Adventures est responsable de l'organisation de l'hébergement, du transport et des activités.</p>
        `,
      },
      {
        id: "insurance",
        title: "Assurance Voyage et Santé",
        content: `
          <h3>3.1 Assurance Voyage</h3>
          <p>Nous recommandons l'achat d'une assurance voyage complète couvrant les urgences médicales.</p>
        `,
      },
      {
        id: "privacy",
        title: "Politique de Confidentialité",
        content: `
          <h3>4.1 Collecte de Données</h3>
          <p>Nous collectons les informations personnelles nécessaires pour les réservations et le traitement des paiements.</p>
        `,
      },
      {
        id: "refund",
        title: "Politique de Remboursement",
        content: `
          <h3>5.1 Remboursement Complet</h3>
          <p>Des remboursements complets sont fournis si ADN Adventures annule les tours pour des circonstances imprévues.</p>
        `,
      },
      {
        id: "conduct",
        title: "Code de Conduite",
        content: `
          <h3>6.1 Comportement Respectueux</h3>
          <p>Les clients sont censés respecter les cultures et traditions locales.</p>
        `,
      },
    ],
  },
}

export default function TermsPage() {
  const { language, t } = useLanguage()
  const [expandedSection, setExpandedSection] = useState<string | null>("booking")

  const content = TERMS_CONTENT[language as keyof typeof TERMS_CONTENT] || TERMS_CONTENT.en

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{content.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Please read our comprehensive terms, conditions, and policies before booking your adventure with us.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Table of Contents */}
        <div className="mb-12 p-8 bg-card border border-border rounded-xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setExpandedSection(section.id)}
                className="text-left px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-primary font-medium"
              >
                • {section.title}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {content.sections.map((section) => (
            <div
              key={section.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all"
            >
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors"
              >
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform ${
                    expandedSection === section.id ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSection === section.id && (
                <div className="px-6 pb-6 border-t border-border">
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none text-foreground"
                    dangerouslySetInnerHTML={{
                      __html: section.content
                        .replace(/<h3>/g, '<h3 class="text-lg font-semibold mt-4 mb-2 text-foreground">')
                        .replace(/<p>/g, '<p class="mb-4 text-muted-foreground leading-relaxed">'),
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-border rounded-xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">Questions or Concerns?</h2>
          <p className="text-muted-foreground mb-6">
            If you have any questions about our terms, conditions, or policies, please don't hesitate to contact us.
          </p>
          <div className="space-y-3">
            <p className="text-foreground">
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@adnadventures.com" className="text-primary hover:underline">
                legal@adnadventures.com
              </a>
            </p>
            <p className="text-foreground">
              <strong>Phone:</strong>{" "}
              <a href="tel:+911234567890" className="text-primary hover:underline">
                +91 (0) 1234 567 890
              </a>
            </p>
            <p className="text-foreground">
              <strong>Address:</strong> New Delhi, India
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Last updated: December 2024</p>
          <p>ADN Adventures reserves the right to update these terms at any time.</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
