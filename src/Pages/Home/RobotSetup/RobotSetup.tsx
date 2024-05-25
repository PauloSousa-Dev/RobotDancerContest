import { useState } from "react";
import { TeamSetup } from "./TeamSetup";
import { DanceFloor } from "./DanceFloor";

const NUMBEROFTEAMS = 3;

type Robot = {
  id: number;
  name: string;
  powermove: string;
  experience: number;
  outOfOrder: boolean;
  avatar: string;
};

type Team = {
  id: number;
  name: string;
  robots: Robot[];
};

const isTeamsComplete = (teams: Team[]) =>
  teams.every((team) => team.robots.length === 5);

const RobotSetup = () => {
  const [teams, setTeams] = useState<Team[]>(
    Array(NUMBEROFTEAMS)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        name: "",
        robots: [],
      }))
  );

  const isRobotsReadyToDance = isTeamsComplete(teams);

  if (isRobotsReadyToDance) {
    return <DanceFloor getTeams={teams} />;
  }

  return (
    <TeamSetup
      getTeams={teams}
      setTeam={(id: number, update: any) => {
        setTeams((teams) => {
          console.log(id, update);
          return teams.map((team) => {
            if (team.id === id) {
              return {
                ...team,
                ...update,
              };
            }
            return team;
          });
        });
      }}
    />
  );
};

export { RobotSetup };
