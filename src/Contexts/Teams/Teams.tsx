import { createContext, useState, useContext, PropsWithChildren } from "react";

type Robot = {
  id: number;
  name: string;
  powermove: string;
  experience: number;
  outOfOrder: boolean;
  avatar: string;
  winner?: boolean;
};

type TeamsContextType = {
  teams: Team[];
  setTeam: (id: number, update: any) => void;
  setRobots: (robotIds: number[], updates: RobotUpdates) => void;
  getRobotsById: (robotIds: number[]) => Robot[];
  consts: { NUMBEROFTEAMS: number; NUMBEROFROBOTS: number };
};

type Team = {
  id: number;
  name: string;
  robots: Robot[];
};

type RobotUpdates = Omit<Partial<Robot>, "id">;

const NUMBEROFTEAMS = 2;
const NUMBEROFROBOTS = 5;

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

const TeamsProvider = ({ children }: PropsWithChildren) => {
  const [teams, setTeams] = useState<Team[]>(
    Array(NUMBEROFTEAMS)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        name: "",
        robots: [],
      }))
  );

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

  const setRobots = (robotIds: number[], updates: RobotUpdates) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => ({
        ...team,
        robots: team.robots.map((robot) =>
          robotIds.includes(robot.id) ? { ...robot, ...updates } : robot
        ),
      }))
    );
  };

  const getRobotsById = (robotIds: number[]): Robot[] => {
    const allRobots = teams.flatMap((team) => team.robots);
    return allRobots.filter((robot) => robotIds.includes(robot.id));
  };

  return (
    <TeamsContext.Provider
      value={{
        teams,
        setTeam,
        setRobots,
        getRobotsById,
        consts: { NUMBEROFTEAMS, NUMBEROFROBOTS },
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

// Custom hook for using the context
const useTeamsContext = () => {
  const context = useContext(TeamsContext);
  if (context === undefined) {
    throw new Error("useTeamsContext must be used within a MyProvider");
  }
  return context;
};

export { TeamsProvider, useTeamsContext };
export type { Robot, Team, RobotUpdates };
