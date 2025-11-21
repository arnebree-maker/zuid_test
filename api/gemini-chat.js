export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Simpele test: negeer Gemini volledig
  try {
    const body = req.body || {};
    console.log("Ontvangen body:", body);

    res.status(200).json({
      reply:
        "Test van Bot Zuid ✅ – de verbinding met de server werkt. " +
        "Als je dit ziet, ligt het probleem alleen nog bij de koppeling met Gemini.",
    });
  } catch (err) {
    console.error("Test-handler error:", err);
    res.status(500).json({ error: "Server error in test handler" });
  }
}
