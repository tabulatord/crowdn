export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { to, subject, html, type } = req.body;
  const RESEND_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_KEY) return res.status(500).json({ error: "Missing API key" });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + RESEND_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "CROWDN <noreply@crowdn.fr>",
        to: [to],
        subject: subject,
        html: html
      })
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Email failed" });
  }
}
