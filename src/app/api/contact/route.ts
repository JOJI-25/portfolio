// ============================================================
// Contact Form API Route
// Handles POST requests from the contact form
// Replace with Resend integration when ready for production
// ============================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return Response.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // ─── Production: Uncomment and configure Resend ───────────
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'Portfolio Contact <onboarding@resend.dev>',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `Portfolio Contact: ${name}`,
    //   html: `
    //     <h2>New Contact Message</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });
    // ──────────────────────────────────────────────────────────

    // For now, log the message (development mode)
    console.log("Contact form submission:", { name, email, message });

    return Response.json(
      { success: true, message: "Message received successfully!" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
