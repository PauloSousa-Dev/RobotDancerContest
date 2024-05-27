import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import { Home } from "../Home";

describe("Home component", () => {
  test("should render correctly", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
