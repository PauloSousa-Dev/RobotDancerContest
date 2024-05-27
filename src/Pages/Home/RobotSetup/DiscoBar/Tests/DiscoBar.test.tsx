import { render } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import { DiscoBar } from "../DiscoBar";

jest.mock("@/Contexts");

describe("Robot Setup component", () => {
  test("should render correctly", () => {
    const { container } = render(<DiscoBar />);
    expect(container).toMatchSnapshot();
  });
});
