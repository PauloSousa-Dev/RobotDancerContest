import { useEffect, useState } from "react";

const API_URL = "https://challenge.parkside-interactive.com/api/danceoffs";

interface DanceOffResult {
  opponents: [number, number];
  winner: number;
}

const DanceFloor = ({ getTeams }: any) => {
  const [results, setResults] = useState<DanceOffResult[]>([]);

  // const startDanceOff = async () => {
  //   const danceOffResults = teams.team1.robots.map((robot, index) => {
  //     const opponent = teams.team2.robots[index];
  //     const winner = Math.random() > 0.5 ? robot : opponent;
  //     return { opponents: [robot.id, opponent.id], winner: winner.id };
  //   });

  //   setResults(danceOffResults);

  //   await fetch(API_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(danceOffResults),
  //   });
  // };

  // useEffect(() => {
  //   startDanceOff();
  // }, []);

  return (
    <div>
      <h2>Dance Floor</h2>
    </div>
  );
};

export { DanceFloor };
