export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { artist } = req.query;
  if (!artist) return res.status(400).json({ error: "Missing artist name" });

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "grant_type=client_credentials&client_id=" + process.env.SPOTIFY_CLIENT_ID + "&client_secret=" + process.env.SPOTIFY_CLIENT_SECRET
    });
    const { access_token } = await tokenRes.json();

    const searchRes = await fetch("https://api.spotify.com/v1/search?q=" + encodeURIComponent(artist) + "&type=artist&limit=1", {
      headers: { "Authorization": "Bearer " + access_token }
    });
    const data = await searchRes.json();
    const found = data.artists?.items?.[0];

    if (found) {
      return res.status(200).json({
        name: found.name,
        image: found.images?.[0]?.url || null,
        genres: found.genres || [],
        popularity: found.popularity,
        spotify_url: found.external_urls?.spotify || null
      });
    }
    return res.status(404).json({ error: "Artist not found" });
  } catch (error) {
    return res.status(500).json({ error: "Spotify API failed" });
  }
}
