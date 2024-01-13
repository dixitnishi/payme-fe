import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ErrorBox from "../ErrorBox";

describe("ErrorBox Component", () => {
  it("renders ErrorBox with success message", () => {
    const successMessage = "Success, Your operation was successful.";
    render(<ErrorBox message={successMessage} />);

    const successBox = screen.getByText("Success, Your operation was successful.");
    expect(successBox).toBeInTheDocument();
    expect(successBox.parentElement).toHaveClass("text-green-800 bg-green-200 rounded-lg");
  });

  it("renders ErrorBox with error message", () => {
    const errorMessage = "Error, Something went wrong!";
    render(<ErrorBox message={errorMessage} />);

    const errorBox = screen.getByText("Error, Something went wrong!");
    expect(errorBox).toBeInTheDocument();
    expect(errorBox.parentElement).toHaveClass("text-red-800 bg-red-200 rounded-lg");
  });
});
