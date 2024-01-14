import { fireEvent, render, screen } from "@testing-library/react";
import Login, { handleLogin } from "../Login";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ErrorBox from "../../Error/ErrorBox";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";

global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Success", token: "mytoken" }),
    status: 200,
  });
const mockLogin = jest.fn();
jest.mock("../../../utils/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ children }) => {
    console.log("children ", children);
    return children;
  }),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../Error/ErrorBox", () =>
  jest.fn(() => <div data-testid="error-box">Error Box</div>)
);

describe("Login component test", () => {
  //   it("Component renders successfully", () => {
  //     const { container } = render(<Login />);
  //     expect(container.firstChild).toMatchSnapshot();
  //   });

  it("Component test login success", async () => {
    render(<Login />);
    const loginButton = screen.queryByText("Sign In");
    await act(() => {
      fireEvent.click(loginButton);
    });
    expect(ErrorBox).toHaveBeenCalledWith({ message: "Success" }, {});
    expect(mockLogin).toHaveBeenCalled();
  });

  it("Component test unsuccessfull status code", async () => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Invalid" }),
        status: 401,
      });
    render(<Login />);
    expect(ErrorBox).toHaveBeenCalledWith({ message: "Invalid" }, {});
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("test if the link redirects", () => {
    render(<Login />);
    expect(Link).toHaveBeenCalledTimes(3);
  });
});
