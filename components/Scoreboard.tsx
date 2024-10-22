"use client";
import { useEffect, useState } from "react";

interface Highscore {
  username: string;
  score: number;
}

const Scoreboard = () => {
  const [highscores, setHighscores] = useState<Highscore[]>([]);

  useEffect(() => {
    const fetchHighscores = async () => {
      const res = await fetch("api/highscore/highscore"); // Corrected API route
      const data: Highscore[] = await res.json();
      setHighscores(data);
    };

    fetchHighscores();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Top 10 High Scores</h2>
      <ul>
        {highscores.map((score, index) => (
          <li key={index} className="flex justify-between">
            <span>{score.username}</span>
            <span>{score.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
