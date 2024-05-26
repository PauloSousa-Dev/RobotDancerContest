import { useState } from "react";
import { Team } from "../RobotSetup";
import { DanceFloor } from "./DanceFloor";
import { Leaderboard } from "./Leaderboard";

const DiscoBar = ({ getTeams }: { getTeams: Team[] }) => {
  const [renderBoard, setRenderBoard] = useState<boolean>(false);
  return (
    <>
      <h2>Disco Bar</h2>
      {renderBoard && <Leaderboard />}
      <DanceFloor getTeams={getTeams} setRenderBoard={setRenderBoard} />
    </>
  );
};

export { DiscoBar };
