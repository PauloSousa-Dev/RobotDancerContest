import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import { RobotSetup } from "../RobotSetup";
import { useTeamsContext } from "@/Contexts/__mocks__";

jest.mock("@/Contexts");

describe("Robot Setup component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock calls and implementations
  });
  test("should render correctly", () => {
    const { container } = render(<RobotSetup />);
    expect(container).toMatchSnapshot();
  });

  test("should render correctly with setup complete", () => {
    (useTeamsContext as jest.Mock).mockReturnValueOnce({
      teams: [
        { id: 1, name: "Custom Team 1", robots: [1, 2, 3, 4, 5] },
        { id: 2, name: "Custom Team 2", robots: [1, 2, 3, 4, 5] },
      ],
      setTeam: jest.fn(),
      setRobots: jest.fn(),
      getRobotsById: jest.fn(),
      cleanWinners: jest.fn(),
      consts: { NUMBEROFTEAMS: 2, NUMBEROFROBOTS: 5 },
    });

    const { container } = render(<RobotSetup />);
    expect(container).toMatchSnapshot();
  });
});
