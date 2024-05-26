import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Button } from "@/components/Button";
import { useTeamsContext } from "@/Contexts";
import { Robots } from "./Robots";
import type { Team } from "@/Contexts/Teams";

const API_URL = "https://challenge.parkside-interactive.com/api/danceoffs";

interface DanceOffResult {
  opponents: number[];
  winner: number;
}

const postWinner = async (
  results: DanceOffResult[],
  setRenderBoard: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ danceoffs: results }),
  });

  if (response.ok) {
    setRenderBoard(true);
  }
};

const getRandomWinner = (robots: number[]) => {
  const randomIndex = Math.floor(Math.random() * robots.length);
  return robots[randomIndex];
};

const runDance = (
  teams: Team[],
  setResults: React.Dispatch<React.SetStateAction<DanceOffResult[]>>,
  NUMBEROFROBOTS: number
) => {
  const newResults: DanceOffResult[] = [];
  for (let dance = 0; dance < NUMBEROFROBOTS; dance++) {
    const robotsInDance = teams.map((team) => team.robots[dance].id);
    const winner = getRandomWinner(robotsInDance);
    newResults.push({
      opponents: robotsInDance,
      winner: winner,
    });
  }
  setResults(newResults);
};

const DanceFloor = ({
  setRenderBoard,
}: {
  setRenderBoard: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    teams,
    cleanWinners,
    consts: { NUMBEROFROBOTS },
  } = useTeamsContext();
  const [results, setResults] = useState<DanceOffResult[]>([]);
  const robotsAlreadyDance = results.length >= NUMBEROFROBOTS;
  useEffect(() => {
    if (robotsAlreadyDance) {
      postWinner(results, setRenderBoard);
    }
  }, [robotsAlreadyDance, results, setRenderBoard]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.teamWrapper}>
        {teams.map(({ id, name, robots }) => (
          <div key={id}>
            <span className={styles.teamName}>Team {name}</span>
            <Robots robots={robots} />
          </div>
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          size="medium"
          disabled={robotsAlreadyDance}
          onClick={() => {
            runDance(teams, setResults, NUMBEROFROBOTS);
          }}
        >
          Start Contest
        </Button>

        {robotsAlreadyDance && (
          <Button
            size="medium"
            onClick={() => {
              cleanWinners();
              setRenderBoard(false);
              setResults([]);
            }}
          >
            reset
          </Button>
        )}
      </div>
    </div>
  );
};

export { DanceFloor };
