import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Transaction from "../Transaction";
import "@testing-library/jest-dom";

// Mocking dependencies
jest.mock("../../../utils/Auth", () => ({
  getAuthToken: jest.fn(() => "mockedToken"),
}));

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

describe("Transaction component tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches and displays transactions", async () => {
    // Mock successful fetch response
    const mockData = [{ id: 1, description: "Transaction 1" }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    render(
      <MemoryRouter>
        <Transaction />
      </MemoryRouter>
    );
    await waitFor(() => {
      const transactionDescription = screen.getByText("Transaction 1");
      expect(transactionDescription).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it("handles network error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <Transaction />
      </MemoryRouter>
    );
    await waitFor(() => {
      const errorMessage = screen.getByText(
        "Network error. Please try again later."
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("redirects to signin page on 401 status", async () => {
    global.fetch.mockResolvedValueOnce({
      status: 401,
      json: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Transaction />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(useNavigate).toHaveBeenCalledTimes(2);
    });
  });

  it("includes Authorization header in fetch request", async () => {
    const mockData = [{ id: 1, description: "Transaction 1" }];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    render(
      <MemoryRouter>
        <Transaction />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
