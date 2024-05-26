import { TeamsProvider } from "@/Contexts";
import { RobotSetup } from "./RobotSetup";

const Home = () => {
  return (
    <TeamsProvider>
      <h1>Robo-Dance Competition</h1>
      <RobotSetup />
    </TeamsProvider>
  );
};

export { Home };
