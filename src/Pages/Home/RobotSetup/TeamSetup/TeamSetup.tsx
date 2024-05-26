import { Button } from "@/components/Button";
import styles from "./style.module.scss";
import { useTeamsContext } from "@/Contexts";
import type { Robot, Team, SetTeamType } from "@/Contexts/Teams";

const API_URL = "https://challenge.parkside-interactive.com/api/robots";

const hasEmptyName = (teams: Team[]) =>
  teams.some((team: Team) => team.name === "");

const fetchRobots = async (index: number, NUMBEROFROBOTS: number) => {
  const response = await fetch(API_URL);
  const robots: Robot[] = await response.json();
  const startIndex = index * NUMBEROFROBOTS;

  return robots
    .filter((robot) => !robot.outOfOrder && robot.experience <= 10)
    .slice(startIndex, startIndex + NUMBEROFROBOTS);
};

const getRobots = (
  teams: Team[],
  setTeam: SetTeamType,
  NUMBEROFROBOTS: number
) => {
  teams.forEach(({ id }, index) => {
    fetchRobots(index, NUMBEROFROBOTS).then((value) =>
      setTeam(id, { robots: value })
    );
  });
};

const TeamSetup = () => {
  const {
    teams,
    setTeam,
    consts: { NUMBEROFROBOTS },
  } = useTeamsContext();
  const isGameReadyToStart = !hasEmptyName(teams);

  return (
    <div className={styles.wrapper}>
      <h2>Set Up Teams</h2>
      <div className={styles.inputWrapper}>
        {teams.map(({ name, id }: Team) => (
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
        <Button
          size="medium"
          onClick={() => getRobots(teams, setTeam, NUMBEROFROBOTS)}
        >
          Fetch Robots
        </Button>
      )}
    </div>
  );
};

export { TeamSetup };
