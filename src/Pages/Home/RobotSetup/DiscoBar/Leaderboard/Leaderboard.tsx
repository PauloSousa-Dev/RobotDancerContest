import { useTeamsContext } from "@/Contexts";
import type { Robot, SetRobotsType, getRobotsByIdType } from "@/Contexts/Teams";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Image } from "@/components/Image";

const API_URL = "https://challenge.parkside-interactive.com/api/danceoffs";

interface LeaderboardItem {
  id: number;
  winner: number;
  loser: number;
  dancedAt: string;
}

const fetchLeaderboard = async (
  setLeaderboard: React.Dispatch<React.SetStateAction<Robot[]>>,
  setRobots: SetRobotsType,
  getRobotsById: getRobotsByIdType,
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
    teams,
  } = useTeamsContext();
  const [leaderboard, setLeaderboard] = useState<Robot[]>([]);
  useEffect(() => {
    fetchLeaderboard(setLeaderboard, setRobots, getRobotsById, NUMBEROFROBOTS);
  }, []);

  return (
    <div>
      <h2>Winners</h2>
      <ul className={styles.wrapper}>
        {leaderboard.map(({ id, avatar, name }) => (
          <li key={id}>
            <Image
              src={avatar}
              alt="Robot image"
              className={styles.robotImage}
            />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Leaderboard };
