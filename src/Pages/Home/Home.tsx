import { useState } from "react";
import { TeamSetup } from "./TeamSetup";
import DanceOff from "./DanceOff";
import Leaderboard from "./Leaderboard";

type Robot = {
  id: number;
  name: string;
  powermove: string;
  experience: number;
  outOfOrder: boolean;
  avatar: string;
};

type Team = {
  name: string;
  robots: Robot[];
};

const App = () => {
  const [teams, setTeams] = useState<{ team1: Team; team2: Team } | null>(null);

  return (
    <div className="App">
      <h1>Robo-Dance Competition</h1>
      <TeamSetup setTeams={setTeams} />
    </div>
  );
};

export { App };
