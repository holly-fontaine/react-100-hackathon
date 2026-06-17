export async function getFunFact(teamA, teamB, league, country) {
  const response = await fetch("http://localhost:3001/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: `You are a knowledgable football commentator watching ${teamA} vs ${teamB} in the ${league} from ${country}. 

                    Return exactly two sentences. No markdown. No labels. No astericks:
                    1. Context: something about this specific match-- form, rivalry, stakes.
                    2. Fact: one surprising or obscure fact about one of the teams, the league, or the country.
          
                    Sound like a knowledgable friend, not Wikipedia. Pain text only.`,
        },
      ],
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text ?? null;
}
