import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "tarunlakkoju925@gmail.com";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
        }

        const safeSubject = subject?.trim() || "New Recruiter / Opportunity Inquiry";
        let emailSent = false;
        let deliveryMethod = "none";

        // 1. Try Resend if RESEND_API_KEY is configured
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey && resendApiKey.startsWith("re_")) {
            try {
                const resend = new Resend(resendApiKey);
                const { data, error } = await resend.emails.send({
                    from: "PULSESTACK Portfolio <onboarding@resend.dev>",
                    to: [RECIPIENT_EMAIL],
                    replyTo: email,
                    subject: `⚡ [PULSESTACK] ${safeSubject} from ${name}`,
                    html: `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0c0e17; color: #f4f4f5; border-radius: 12px; border: 1px solid #27272a;">
                            <div style="border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 20px;">
                                <h2 style="color: #38bdf8; margin: 0; font-size: 20px;">⚡ New Recruiter Inquiry on PULSESTACK</h2>
                                <p style="color: #a1a1aa; font-size: 13px; margin: 4px 0 0;">Received directly via your live portfolio contact form</p>
                            </div>

                            <div style="background: #18181b; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #3f3f46;">
                                <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                                    <tr>
                                        <td style="color: #a1a1aa; padding: 6px 0; width: 100px;">Sender Name:</td>
                                        <td style="color: #ffffff; font-weight: 600;">${name}</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #a1a1aa; padding: 6px 0;">Email:</td>
                                        <td style="color: #38bdf8;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                                    </tr>
                                    <tr>
                                        <td style="color: #a1a1aa; padding: 6px 0;">Subject:</td>
                                        <td style="color: #ffffff;">${safeSubject}</td>
                                    </tr>
                                </table>
                            </div>

                            <div style="margin-bottom: 24px;">
                                <h3 style="color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message:</h3>
                                <div style="background: #12141f; padding: 16px; border-radius: 8px; border-left: 3px solid #38bdf8; font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap;">
${message}
                                </div>
                            </div>

                            <div style="border-top: 1px solid #27272a; padding-top: 16px; display: flex; justify-content: space-between; align-items: center;">
                                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(safeSubject)}" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 10px 20px; border-radius: 6px; font-weight: 600; font-size: 13px; text-decoration: none;">
                                    Reply Directly to ${name}
                                </a>
                                <span style="font-size: 11px; color: #71717a;">PULSESTACK Notification Engine</span>
                            </div>
                        </div>
                    `
                });

                if (!error && data?.id) {
                    emailSent = true;
                    deliveryMethod = "resend";
                } else if (error) {
                    console.error("Resend error:", error);
                }
            } catch (resendErr: any) {
                console.error("Resend execution error:", resendErr.message);
            }
        }

        // 2. Try Web3Forms if WEB3FORMS_ACCESS_KEY is configured
        const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
        if (!emailSent && web3formsKey) {
            try {
                const w3Res = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        access_key: web3formsKey,
                        name,
                        email,
                        subject: `⚡ [PULSESTACK] ${safeSubject} from ${name}`,
                        message: `Sender: ${name}\nEmail: ${email}\nSubject: ${safeSubject}\n\nMessage:\n${message}`,
                        from_name: "PULSESTACK Portfolio"
                    })
                });

                if (w3Res.ok) {
                    emailSent = true;
                    deliveryMethod = "web3forms";
                }
            } catch (w3Err: any) {
                console.error("Web3Forms error:", w3Err.message);
            }
        }

        // 3. Fallback: Log inquiry for backend records
        console.log(`📩 Recruiter Inquiry recorded: [${name}] [${email}] ${safeSubject}: ${message}`);

        return NextResponse.json({
            success: true,
            emailSent,
            deliveryMethod,
            message: emailSent 
                ? `Thank you, ${name}! Your message was delivered immediately to Tarun Lakkoju's inbox.`
                : `Thank you, ${name}! Your inquiry has been received. Tarun will get back to you shortly.`
        });
    } catch (err: any) {
        console.error("Contact API exception:", err);
        return NextResponse.json({ error: "Failed to process message: " + err.message }, { status: 500 });
    }
}
