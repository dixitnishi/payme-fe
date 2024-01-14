import { Signup } from "../Signup";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Link } from "react-router-dom";
import ErrorBox from "../../Error/ErrorBox";


jest.mock("../../../utils/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ children }) => {
    console.log("children ", children);
    return children;
  }),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../Error/ErrorBox", () => jest.fn(() => <div>Error box</div>));

describe("Signout Compoenent test", () => {
  it("Component rendered successfully", () => {
    render(<Signup />);
  });

  it("Button is visible", () => {
    render(<Signup />);
    expect(screen.getByText("Create Wallet")).toBeInTheDocument();
  });

  it("test is visible", () => {
    render(<Signup />);
    expect(screen.getByText("Sign up to create wallet")).toBeInTheDocument();
  });

  it("text is visible", () => {
    render(<Signup />);
    expect(screen.getByText("Already have an wallet?")).toBeInTheDocument();
  });

  it("text is visible", () => {
    render(<Signup />);
    expect(screen.getByText("Already have an wallet?")).toBeInTheDocument();
  });

  it("text is visible", () => {
    render(<Signup />);
    expect(screen.getByText("Create Wallet")).toBeInTheDocument();
  });
  it("Links are rendered", () => {
    render(<Signup />);
    expect(Link).toHaveBeenCalledTimes(3);
  });

  it("validate the error box is rendered", () => {
    render(<Signup />);
    fireEvent.click(screen.getByText("Create Wallet"));
    expect(ErrorBox).toHaveBeenCalled();
  });
});
