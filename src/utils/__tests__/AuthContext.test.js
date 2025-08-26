// AuthContext.test.js
import React from "react";
import { render, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
import { getAuthToken } from "../Auth";
import "@testing-library/jest-dom";

jest.mock("../Auth", () => ({
  getAuthToken: jest.fn(),
}));

describe("AuthContext tests", () => {
  it("renders children with initial state", () => {
    const { getByText } = render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>
    );
    const testChild = getByText("Test Child");
    expect(testChild).toBeInTheDocument();
  });

  it("provides authentication context values", () => {
    const TestComponent = () => {
      const auth = useAuth();
      return (
        <div>
          <div>{auth.authenticated.toString()}</div>
        </div>
      );
    };
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const authenticatedText = getByText("false");
    expect(authenticatedText).toBeInTheDocument();
  });

  it("updates state on login and logout", () => {
    const TestComponent = () => {
      const auth = useAuth();
      return (
        <div>
          <button onClick={() => auth.login("123")}>Login</button>
          <button onClick={() => auth.logout()}>Logout</button>
          <div>{auth.authenticated.toString()}</div>
          <div>{auth.accountId}</div>
        </div>
      );
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = getByText("Login");
    const logoutButton = getByText("Logout");

    act(() => {
      loginButton.click();
    });

    const authenticatedTextAfterLogin = getByText("true");
    const accountIdTextAfterLogin = getByText("123");

    expect(authenticatedTextAfterLogin).toBeInTheDocument();
    expect(accountIdTextAfterLogin).toBeInTheDocument();

    act(() => {
      logoutButton.click();
    });

    const authenticatedTextAfterLogout = getByText("false");
    expect(authenticatedTextAfterLogout).toBeInTheDocument();
  });

  it("provides signup function", () => {
    const TestComponent = () => {
      const auth = useAuth();
      return (
        <div>
          <button onClick={() => auth.signUp("456")}>SignUp</button>
          <div>{auth.authenticated.toString()}</div>
          <div>{auth.accountId}</div>
        </div>
      );
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const signUpButton = getByText("SignUp");

    act(() => {
      signUpButton.click();
    });

    const authenticatedTextAfterSignUp = getByText("true");
    const accountIdTextAfterSignUp = getByText("456");

    expect(authenticatedTextAfterSignUp).toBeInTheDocument();
    expect(accountIdTextAfterSignUp).toBeInTheDocument();
  });
});
