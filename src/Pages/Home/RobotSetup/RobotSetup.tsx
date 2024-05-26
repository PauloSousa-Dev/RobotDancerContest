import { useState } from "react";
import { TeamSetup } from "./TeamSetup";
import { DiscoBar } from "./DiscoBar";

const NUMBEROFTEAMS = 2;
const NUMBEROFROBOTS = 5;

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
  teams.every((team) => team.robots.length === NUMBEROFROBOTS);

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

  const setTeam = (id: number, update: any) => {
    setTeams((teams) => {
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
  };

  if (isRobotsReadyToDance) {
    return <DiscoBar getTeams={teams} />;
  }

  return <TeamSetup getTeams={teams} setTeam={setTeam} />;
};

export { RobotSetup, NUMBEROFROBOTS };
export type { Team, Robot };
