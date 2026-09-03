import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
        }

        console.log(`📩 Recruiter Inquiry received: ${name} (${email}) - ${subject}: ${message}`);

        // Also attempt forwarding to local Express server if running in background
        try {
            fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            }).catch(() => {});
        } catch (e) {}

        return NextResponse.json({
            success: true,
            message: "Thank you! Your message has been sent directly to Tarun Lakkoju."
        });
    } catch (err: any) {
        return NextResponse.json({ error: "Failed to process message." }, { status: 500 });
    }
}
