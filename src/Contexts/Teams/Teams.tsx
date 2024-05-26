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

type Team = {
  id: number;
  name: string;
  robots: Robot[];
};

type SetTeamType = (id: number, update: Omit<Partial<Team>, "id">) => void;
type SetRobotsType = (robotIds: number[], updates: RobotUpdates) => void;
type getRobotsByIdType = (robotIds: number[]) => Robot[];
type TeamsContextType = {
  teams: Team[];
  setTeam: SetTeamType;
  setRobots: SetRobotsType;
  getRobotsById: getRobotsByIdType;
  cleanWinners: () => void;
  consts: { NUMBEROFTEAMS: number; NUMBEROFROBOTS: number };
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

  const setTeam = (id: number, update: Omit<Partial<Team>, "id">) => {
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

  const cleanWinners = () => {
    setTeams((prevTeams) => {
      const newTeam = prevTeams.map((team) => ({
        ...team,
        robots: team.robots.map((robot) => {
          const { winner, ...rest } = robot;
          return rest;
        }),
      }));
      return newTeam;
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
        cleanWinners,
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
export type {
  Robot,
  Team,
  RobotUpdates,
  SetTeamType,
  SetRobotsType,
  getRobotsByIdType,
};
