import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Rightpanel from "../Rightpanel";
import { useAuth } from "../../../utils/AuthContext";
import SignoutModal from "../../Modal/SignoutModal";
import Dashboard from "../../Dashboard/Dashboard";
import Wallet from "../../Wallet/Wallet";
import Transaction from "../../Transaction/Transaction";
import Cashback from "../../Cashback/Cashback";


jest.mock("../../../utils/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../Wallet/Wallet", () =>
  jest.fn(() => <div data-testid="wallet-content"></div>)
);

jest.mock("../../Dashboard/Dashboard", () =>
  jest.fn(() => <div data-testid="dashboard-content"></div>)
);

jest.mock("../../Transaction/Transaction", () =>
  jest.fn(() => <div data-testid="transaction-content"></div>)
);

jest.mock("../../Cashback/Cashback", () =>
  jest.fn(() => <div data-testid="cashback-content"></div>)
);

jest.mock("../../Modal/SignoutModal", () =>
  jest.fn(() => <div data-testid="signout">Yes</div>)
);

describe("Rightpanel Component", () => {
  it("renders dashboard component by default", async () => {
    useAuth.mockReturnValue({
      authenticated: true,
      logout: jest.fn(),
    });
    render(<Rightpanel/>);
    expect(Dashboard).toHaveBeenCalled();
    expect(SignoutModal).toHaveBeenCalledWith(
      {
        isOpen: false,
        onRequestClose: expect.any(Function),
        handleSignout: expect.any(Function),
      },
      {}
    );
  });

  it("renders dashboard component", async () => {
    useAuth.mockReturnValue({
      authenticated: true,
      logout: jest.fn(),
    });
    render(<Rightpanel selectedButton="dashboard" />);
    expect(Dashboard).toHaveBeenCalled();
    expect(SignoutModal).toHaveBeenCalledWith(
      {
        isOpen: false,
        onRequestClose: expect.any(Function),
        handleSignout: expect.any(Function),
      },
      {}
    );
  });

  it("renders wallet operations component", async () => {
    useAuth.mockReturnValue({
      authenticated: true,
      logout: jest.fn(),
    });
    render(<Rightpanel selectedButton="operations" />);
    expect(Wallet).toHaveBeenCalled();
    expect(SignoutModal).toHaveBeenCalledWith(
      {
        isOpen: false,
        onRequestClose: expect.any(Function),
        handleSignout: expect.any(Function),
      },
      {}
    );
  });

  it("renders transactions component", async () => {
    useAuth.mockReturnValue({
      authenticated: true,
      logout: jest.fn(),
    });
    render(<Rightpanel selectedButton="transactions" />);
    expect(Transaction).toHaveBeenCalled();
    expect(SignoutModal).toHaveBeenCalledWith(
      {
        isOpen: false,
        onRequestClose: expect.any(Function),
        handleSignout: expect.any(Function),
      },
      {}
    );
  });

  it("renders cashbacks component", async () => {
    useAuth.mockReturnValue({
      authenticated: true,
      logout: jest.fn(),
    });
    render(<Rightpanel selectedButton="cashbacks" />);
    expect(Cashback).toHaveBeenCalled();
    expect(SignoutModal).toHaveBeenCalledWith(
      {
        isOpen: false,
        onRequestClose: expect.any(Function),
        handleSignout: expect.any(Function),
      },
      {}
    );
  });

    it("displays Sign Out button when authenticated", () => {
        useAuth.mockReturnValue({
        authenticated: true,
        logout: jest.fn(),
      });
      render(<Rightpanel />);
      expect(screen.getByText("Sign out")).toBeInTheDocument();
    });

    it("does not display Sign Out button when not authenticated", () => {
      useAuth.mockReturnValue({
        authenticated: false,
        logout: jest.fn(),
      });
      render(<Rightpanel />);
      expect(screen.queryByText("Sign out")).not.toBeInTheDocument();
    });

    it("opens the sign-out modal when Sign Out button is clicked", async () => {
      useAuth.mockReturnValue({
        authenticated: true,
        logout: jest.fn(),
      });
      render(<Rightpanel />);

      const signOutButton = screen.getByRole("button",{name:"Sign out"});
      
      userEvent.click(signOutButton);
      await act(async () => {
        expect(SignoutModal).toHaveBeenCalledWith(
            {
              isOpen: true,
              onRequestClose: expect.any(Function),
              handleSignout: expect.any(Function),
            },
            {}
          );
      });
    });
});
