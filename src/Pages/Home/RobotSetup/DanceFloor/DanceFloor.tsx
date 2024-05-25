import { useEffect, useState } from "react";
import { NUMBEROFROBOTS, type Team } from "../RobotSetup";
import styles from "./style.module.scss";
import { Button } from "@/components/Button";

const API_URL = "https://challenge.parkside-interactive.com/api/danceoffs";

interface DanceOffResult {
  opponents: number[];
  winner: number;
}

const postWinner = async (results: any) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ danceoffs: results }),
  });
};

const getRandomWinner = (robots: any) => {
  const randomIndex = Math.floor(Math.random() * robots.length);
  return robots[randomIndex];
};

const DanceFloor = ({
  getTeams,
}: {
  getTeams: Team[];
  setTeam: (id: number, object: unknown) => void;
}) => {
  const [results, setResults] = useState<DanceOffResult[]>([]);
  const runDance = () => {
    const newResults: DanceOffResult[] = [];
    for (let dance = 0; dance < NUMBEROFROBOTS; dance++) {
      const robotsInDance = getTeams.map((team) => team.robots[dance].id);
      const winner = getRandomWinner(robotsInDance);
      newResults.push({
        opponents: robotsInDance,
        winner: winner,
      });
    }
    setResults(newResults);
  };

  useEffect(() => {
    if (results.length >= NUMBEROFROBOTS) {
      postWinner(results);
    }
  }, [results]);

  return (
    <div className={styles.wrapper}>
      <h2>Dance Floor</h2>
      <div className={styles.teamWrapper}>
        {getTeams.map(({ id, name, robots }) => (
          <div key={id}>
            <div className={styles.teamName}>Team {name}</div>
            {robots.map(({ id, name }) => (
              <div key={id}>{name}</div>
            ))}
          </div>
        ))}
      </div>
      <Button size="medium" onClick={() => runDance()}>
        Start Contest
      </Button>
    </div>
  );
};

export { DanceFloor };
