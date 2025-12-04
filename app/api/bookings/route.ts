import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

interface BookingData {
  name: string
  email: string
  phone: string
  date: string
  guests: string
  specialRequests?: string
  packageId: number
  packageTitle: string
}

function generateConfirmationEmail(booking: BookingData, bookingId: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8B6F47 0%, #D4A574 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 20px; border-left: 4px solid #D4A574; margin: 20px 0; border-radius: 4px; }
        .booking-details h3 { margin-top: 0; color: #8B6F47; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; text-align: right; }
        .booking-id { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .booking-id p { margin: 0; }
        .booking-id strong { color: #4caf50; }
        .next-steps { margin-top: 20px; }
        .next-steps h3 { color: #8B6F47; }
        .next-steps ol { padding-left: 20px; }
        .next-steps li { margin: 10px 0; }
        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; margin-top: 20px; }
        .cta-button { display: inline-block; background: #8B6F47; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmation</h1>
          <p>ADN Adventures - Your Journey Awaits</p>
        </div>
        
        <div class="content">
          <p>Dear ${booking.name},</p>
          
          <p>Thank you for booking with ADN Adventures! Your booking has been received and is being processed. Below are your booking details:</p>
          
          <div class="booking-id">
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p style="font-size: 12px; margin-top: 5px;">Please save this reference number for future correspondence.</p>
          </div>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span class="detail-label">Package:</span>
              <span class="detail-value">${booking.packageTitle}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Travel Date:</span>
              <span class="detail-value">${new Date(booking.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Number of Guests:</span>
              <span class="detail-value">${booking.guests}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Email:</span>
              <span class="detail-value">${booking.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Phone:</span>
              <span class="detail-value">${booking.phone}</span>
            </div>
            ${
              booking.specialRequests
                ? `
            <div class="detail-row">
              <span class="detail-label">Special Requests:</span>
              <span class="detail-value">${booking.specialRequests}</span>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="next-steps">
            <h3>What Happens Next?</h3>
            <ol>
              <li>Our team will review your booking and confirm availability within 24 hours.</li>
              <li>You'll receive a payment invoice with bank details or secure payment link.</li>
              <li>After payment, you'll get a detailed itinerary and travel guide.</li>
              <li>Our team will contact you 7 days before your tour to confirm final details.</li>
            </ol>
          </div>
          
          <p>If you have any questions or need to make changes, please don't hesitate to contact us:</p>
          <p>
            <strong>Email:</strong> info@adnadventures.com<br>
            <strong>Phone:</strong> +91 (0) 1234 567 890<br>
            <strong>Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST
          </p>
          
          <a href="https://adnadventures.com" class="cta-button">View Your Booking</a>
          
          <div class="footer">
            <p>&copy; 2025 ADN Adventures. All rights reserved.</p>
            <p>From Kanyakumari to Kashmir - Discover the Magic of India</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateAdminNotification(booking: BookingData, bookingId: string): string {
  return `
    <h2>New Booking Received</h2>
    <p><strong>Booking ID:</strong> ${bookingId}</p>
    
    <h3>Customer Information</h3>
    <ul>
      <li><strong>Name:</strong> ${booking.name}</li>
      <li><strong>Email:</strong> ${booking.email}</li>
      <li><strong>Phone:</strong> ${booking.phone}</li>
    </ul>
    
    <h3>Tour Details</h3>
    <ul>
      <li><strong>Package:</strong> ${booking.packageTitle}</li>
      <li><strong>Travel Date:</strong> ${booking.date}</li>
      <li><strong>Number of Guests:</strong> ${booking.guests}</li>
      ${booking.specialRequests ? `<li><strong>Special Requests:</strong> ${booking.specialRequests}</li>` : ""}
    </ul>
    
    <p>Please follow up with the customer within 24 hours.</p>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.date || !body.packageTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const bookingId = `ADN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Example: await db.bookings.create({ ...body, bookingId, createdAt: new Date() })

    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || "noreply@adnadventures.com",
          to: body.email,
          subject: `Booking Confirmation - ADN Adventures (${bookingId})`,
          html: generateConfirmationEmail(body, bookingId),
        })

        await transporter.sendMail({
          from: process.env.SMTP_FROM || "noreply@adnadventures.com",
          to: process.env.ADMIN_EMAIL || "admin@adnadventures.com",
          subject: `New Booking: ${body.packageTitle} - ${bookingId}`,
          html: generateAdminNotification(body, bookingId),
        })
      } catch (emailError) {
        console.error("Email sending error:", emailError)
        // Don't fail the booking if email fails, just log it
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking received. Check your email for confirmation.",
        bookingId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 })
  }
}
