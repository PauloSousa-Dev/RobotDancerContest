const useTeamsContext = jest.fn();

const defaultMockReturnValue = {
  teams: [
    { id: 1, name: "Team 1", robots: [] },
    { id: 2, name: "Team 2", robots: [] },
  ],
  setTeam: jest.fn(),
  setRobots: jest.fn(),
  getRobotsById: jest.fn(),
  cleanWinners: jest.fn(),
  consts: { NUMBEROFTEAMS: 2, NUMBEROFROBOTS: 5 },
};

useTeamsContext.mockReturnValue(defaultMockReturnValue);

export { useTeamsContext, defaultMockReturnValue };
