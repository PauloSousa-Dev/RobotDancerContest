import { useTeamsContext } from "@/Contexts";
import { Robot, RobotUpdates } from "@/Contexts/Teams/Teams";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

const API_URL = "https://challenge.parkside-interactive.com/api/danceoffs";

interface LeaderboardItem {
  id: number;
  winner: number;
  loser: number;
  dancedAt: string;
}

const fetchLeaderboard = async (
  setLeaderboard: React.Dispatch<React.SetStateAction<Robot[]>>,
  setRobots: (robotIds: number[], updates: RobotUpdates) => void,
  getRobotsById: (robotIds: number[]) => Robot[],
  NUMBEROFROBOTS: number
) => {
  const response = await fetch(API_URL);
  const data: LeaderboardItem[] = await response.json();
  const lastEntries = data.slice(0, NUMBEROFROBOTS).reverse();
  const winnerRobots: number[] = lastEntries.map((match) => match.winner);
  const getRobotsInfo = getRobotsById(winnerRobots);
  setRobots(winnerRobots, { winner: true });
  setLeaderboard(getRobotsInfo);
};

const Leaderboard = () => {
  const {
    consts: { NUMBEROFROBOTS },
    setRobots,
    getRobotsById,
  } = useTeamsContext();
  const [leaderboard, setLeaderboard] = useState<Robot[]>([]);

  useEffect(() => {
    fetchLeaderboard(setLeaderboard, setRobots, getRobotsById, NUMBEROFROBOTS);
  }, []);

  return (
    <div>
      <h2>Winners</h2>
      <ul className={styles.wrapper}>
        {leaderboard.map(({ id, name }, index) => (
          <li key={index}>{` Winner ${name}`}</li>
        ))}
      </ul>
    </div>
  );
};

export { Leaderboard };
