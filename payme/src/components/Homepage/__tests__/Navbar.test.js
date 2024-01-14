import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "../Navbar";

describe("Navbar Component", () => {
  it("renders Navbar with Sign Up and Log In buttons", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const signUpButton = screen.getByText("Sign Up");
    const logInButton = screen.getByText("Log In");
    expect(signUpButton).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
  });

  it("navigates to the Sign Up page when Sign Up button is clicked", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const signUpButton = screen.getByText("Sign Up");

    fireEvent.click(signUpButton);
    expect(window.location.pathname).toBe("/signup");
  });

  it("navigates to the Log In page when Log In button is clicked", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const logInButton = screen.getByText("Log In");
    fireEvent.click(logInButton);
    expect(window.location.pathname).toBe("/signin");
  });
  
});
