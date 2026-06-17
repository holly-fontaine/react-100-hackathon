import { useState, useEffect } from "react";
import Card from "./components/Card";
import { fetchLiveMatches } from "./api/apiSports";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchLiveMatches().then(setMatches);

    const interval = setInterval(() => {
      fetchLiveMatches().then(setMatches);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="header">
        <h1>Matchday</h1>
        <p className="tagline">
          Live scores from soccer teams you've never heard of
        </p>
      </div>
      <div className="match-list">
        {matches.length === 0 && (
          <p style={{ padding: "2rem", color: "#a0a09a" }}>
            Loading matches...
          </p>
        )}
        {matches.map((match) => (
          <Card
            key={match.id}
            a={match.teamA}
            b={match.teamB}
            location={match.location}
            elapsed={match.elapsed}
            scoreA={match.scoreA}
            scoreB={match.scoreB}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
