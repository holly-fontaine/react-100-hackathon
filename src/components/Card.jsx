import { useState, useEffect } from "react";
import { getFunFact } from "../api/claude";

function Card({ a, b, location, elapsed, scoreA, scoreB }) {
  const [fact, setFact] = useState(null);

  useEffect(() => {
    const [country, league] = location.split(" • ");
    getFunFact(a, b, league, country).then(setFact);
  }, []);

  return (
    <div className="match-row">
      <div className="match-meta">
        <span className="sport-label">{location}</span>
        {elapsed && <span className="live-badge">LIVE {elapsed}</span>}
      </div>
      <div className="match-teams">
        <a
          className="team-a team-link"
          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(a)}`}
          target="_blank"
          rel="noreferrer"
        >
          {a}
        </a>
        <span className="score">
          {scoreA ?? "-"} - {scoreB ?? "-"}
        </span>
        <a
          className="team-b team-link"
          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(b)}`}
          target="_blank"
          rel="noreferrer"
        >
          {b}
        </a>
      </div>
      {fact && (
        <div className="fact-block">
          <p className="fact-context">'{fact.split(". ")[0]}'</p>
          <p className="fact-trivia">{fact.split(". ").slice(1).join(". ")}</p>
        </div>
      )}
    </div>
  );
}

export default Card;
