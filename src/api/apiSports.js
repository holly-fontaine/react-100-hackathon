const url =
  "https://react-100-hackathon-production.up.railway.app/api/football";

export async function fetchLiveMatches() {
  const results = [];
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    const fixtures = data.response ?? [];

    fixtures.forEach((fixture) => {
      const elapsed = fixture.fixture?.status?.elapsed ?? null;
      if (!elapsed) return; // i only care about the games that are live
      const home = fixture.teams?.home?.name ?? null;
      const away = fixture.teams?.away?.name ?? null;
      if (!home || !away) return;
      const homeScore = fixture.goals?.home ?? null;
      const awayScore = fixture.goals?.away ?? null;

      results.push({
        id: String(fixture.fixture?.id ?? fixture.game?.id ?? Math.random()),
        location: `${fixture.league?.country} - ${fixture.league?.name}`,
        teamA: home,
        teamB: away,
        elapsed: elapsed,
        scoreA: homeScore,
        scoreB: awayScore,
      });
    });
  } catch (err) {
    console.warn(`Failed to fetch ${name}:`, err);
  }
  return results.sort((a, b) => b.elapsed - a.elapsed);
}
