import { NUMBEROFROBOTS, Robot, Team } from "../RobotSetup";
import styles from "./style.module.scss";

const API_URL = "https://challenge.parkside-interactive.com/api/robots";

const hasEmptyName = (teams: Team[]) =>
  teams.some((team: Team) => team.name === "");

const fetchRobots = async (index: number) => {
  const response = await fetch(API_URL);
  const robots: Robot[] = await response.json();
  const startIndex = index * NUMBEROFROBOTS;

  return robots
    .filter((robot) => !robot.outOfOrder && robot.experience <= 10)
    .slice(startIndex, startIndex + NUMBEROFROBOTS);
};

const TeamSetup = ({
  getTeams,
  setTeam,
}: {
  getTeams: Team[];
  setTeam: (id: number, object: unknown) => void;
}) => {
  const isGameReadyToStart = !hasEmptyName(getTeams);

  const getRobots = () => {
    getTeams.forEach(({ id }, index) => {
      fetchRobots(index).then((value) => setTeam(id, { robots: value }));
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2>Set Up Teams</h2>
      <div className={styles.inputWrapper}>
        {getTeams.map(({ name, id }: any, index: number) => (
          <input
            key={id}
            type="text"
            placeholder={`Team ${id} Name`}
            value={name}
            onChange={(e) => setTeam(id, { name: e.target.value })}
          />
        ))}
      </div>

      {isGameReadyToStart && (
        <button onClick={() => getRobots()}>Fetch Robots</button>
      )}
    </div>
  );
};

export { TeamSetup };
