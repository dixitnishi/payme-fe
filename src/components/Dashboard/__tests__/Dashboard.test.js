import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { BrowserRouter } from "react-router-dom";

import Dashboard from "../Dashboard";

// Mocking the fetch function
fetchMock.enableMocks();

describe("Dashboard Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("renders Dashboard component with account details", async () => {
    const mockAccountDetails = {
      name: "John Doe",
      accountNo: "123456789",
      balance: 1000,
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockAccountDetails));

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Full name : John Doe")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Account number : 123456789")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Balance : 1000")).toBeInTheDocument();
    });
  });

  it("renders Dashboard component with error", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Account Details")).toBeInTheDocument();
      
    });
    
    // await waitFor(() => {
    //   expect(screen.getByText("Network error")).toBeInTheDocument();
    // });
  });
});
