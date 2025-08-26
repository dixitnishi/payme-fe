import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Homepage from "../Homepage";

jest.mock("../Navbar", () => {
  return () => <div data-testid="mock-navbar">Mock Navbar</div>;
});

describe("Homepage Component", () => {
  it("renders Homepage component with Navbar", () => {
    render(<Homepage />);

    const navbarElement = screen.getByTestId("mock-navbar");
    expect(navbarElement).toBeInTheDocument();
  });

  it("renders Welcome message", () => {
    render(<Homepage />);

    const welcomeMessage = screen.getByText("Welcome to the wallet application");
    expect(welcomeMessage).toBeInTheDocument();
    expect(welcomeMessage).toHaveClass("text-4xl");
  });
});
