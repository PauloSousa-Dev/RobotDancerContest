import { TeamSetup } from "./TeamSetup";
import { DiscoBar } from "./DiscoBar";
import { useTeamsContext } from "@/Contexts";

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

const RobotSetup = () => {
  const {
    teams,
    consts: { NUMBEROFROBOTS },
  } = useTeamsContext();
  const isRobotsReadyToDance = teams.every(
    (team) => team.robots.length === NUMBEROFROBOTS
  );

  if (isRobotsReadyToDance) {
    return <DiscoBar />;
  }

  return <TeamSetup />;
};

export { RobotSetup };
