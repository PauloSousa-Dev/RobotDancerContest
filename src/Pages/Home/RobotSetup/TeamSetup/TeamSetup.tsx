import { Robot, Team } from "./App";

const API_URL = "https://challenge.parkside-interactive.com/api/robots";

const hasEmptyName = (teams: Team[]) =>
  teams.some((team: Team) => team.name === "");

const fetchRobots = async () => {
  const response = await fetch(API_URL);
  const robots: Robot[] = await response.json();
  return robots
    .filter((robot) => !robot.outOfOrder && robot.experience <= 10)
    .slice(0, 5);
};

const TeamSetup = ({
  getTeams,
  setTeam,
}: {
  getTeams: Team[];
  setTeam: (id: number, team: Team) => void;
}) => {
  const isGameReadyToStart = !hasEmptyName(getTeams);

  const getRobots = () => {
    getTeams.forEach(({ id }) => {
      fetchRobots().then((value) => setTeam(id, { robots: value }));
    });
  };

  // const handleStartCompetition = () => {
  //   setTeams({
  //     team1: { name: teamName1, robots: team1 },
  //     team2: { name: teamName2, robots: team2 },
  //   });
  // };

  return (
    <div>
      <h2>Set Up Teams</h2>
      {getTeams.map(({ name, id }: any, index: number) => (
        <input
          key={id}
          type="text"
          placeholder={`Team ${id} Name`}
          value={name}
          onChange={(e) => setTeam(id, { name: e.target.value })}
        />
      ))}
      {isGameReadyToStart && (
        <button onClick={() => getRobots()}>Fetch Robots</button>
      )}
      {/*team1 && team2 && (
        <button onClick={handleStartCompetition}>Start Competition</button>
      )} */}
    </div>
  );
};

export { TeamSetup };
