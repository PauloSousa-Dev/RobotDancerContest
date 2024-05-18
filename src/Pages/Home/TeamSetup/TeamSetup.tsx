import React, { useState } from "react";
import { Robot, Team } from "./App";

const API_URL = "https://challenge.parkside-interactive.com/api/robots";

interface TeamSetupProps {
  setTeams: React.Dispatch<
    React.SetStateAction<{ team1: Team; team2: Team } | null>
  >;
}

const TeamSetup = ({ setTeams }: TeamSetupProps) => {
  const [team1, setTeam1] = useState<Robot[]>([]);
  const [team2, setTeam2] = useState<Robot[]>([]);
  const [teamName1, setTeamName1] = useState<string>("");
  const [teamName2, setTeamName2] = useState<string>("");

  const fetchRobots = async () => {
    const response = await fetch(API_URL);
    const robots: Robot[] = await response.json();
    const availableRobots = robots.filter(
      (robot) => !robot.outOfOrder && robot.experience <= 10
    );
    setTeam1(availableRobots.slice(0, 5));
    setTeam2(availableRobots.slice(5, 10));
  };

  const handleStartCompetition = () => {
    setTeams({
      team1: { name: teamName1, robots: team1 },
      team2: { name: teamName2, robots: team2 },
    });
  };

  return (
    <div>
      <h2>Set Up Teams</h2>
      <input
        type="text"
        placeholder="Team 1 Name"
        value={teamName1}
        onChange={(e) => setTeamName1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Team 2 Name"
        value={teamName2}
        onChange={(e) => setTeamName2(e.target.value)}
      />
      <button onClick={fetchRobots}>Fetch Robots</button>
      <button onClick={handleStartCompetition}>Start Competition</button>
    </div>
  );
};

export { TeamSetup };
