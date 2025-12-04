import { type NextRequest, NextResponse } from "next/server";
import { bookingService } from "@/lib/db";

// GET BOOKING BY ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // Important for Netlify

    const booking = await bookingService.findById(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

// UPDATE BOOKING BY ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // Important for Netlify

    const body = await request.json();
    const updated = await bookingService.update(id, body);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
