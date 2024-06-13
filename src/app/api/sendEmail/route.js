import { Resend } from "resend";
import { NextResponse } from "next/server";
import StripeWelcomeEmail from "../../../../emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();

  try {
    const data = await resend.emails.send({
      from: "Appointments@braidsbyregi.com",
      to: [response.data.email],
      subject: "Booking Confirmation ",
      react: StripeWelcomeEmail({ response }),
    });
    return NextResponse.json({ data: "Email Sent" });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
