import { useState } from "react";
import { DanceFloor } from "./DanceFloor";
import { Leaderboard } from "./Leaderboard";

const DiscoBar = () => {
  const [renderBoard, setRenderBoard] = useState<boolean>(false);
  return (
    <>
      <h2>Disco Bar</h2>
      {renderBoard && <Leaderboard />}
      <DanceFloor setRenderBoard={setRenderBoard} />
    </>
  );
};

export { DiscoBar };
