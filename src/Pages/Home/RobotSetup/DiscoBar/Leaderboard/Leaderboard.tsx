import { useEffect, useState } from "react";
import { NUMBEROFROBOTS } from "../../RobotSetup";

const API_URL = "https://challenge.parkside-interactive.com/api/danceoffs";

interface LeaderboardItem {
  id: number;
  winner: number;
  loser: number;
  dancedAt: string;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  const fetchLeaderboard = async () => {
    const response = await fetch(API_URL);
    const data: LeaderboardItem[] = await response.json();
    setLeaderboard(data);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard
          .slice(0, NUMBEROFROBOTS)
          .reverse()
          .map((item, index) => (
            <li
              key={index}
            >{`Match ${item.id}: Winner is Robot ${item.winner}`}</li>
          ))}
      </ul>
    </div>
  );
};

export { Leaderboard };
