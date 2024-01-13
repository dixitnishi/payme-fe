import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import Cashback from "../Cashback";

// Mocking the fetch function
fetchMock.enableMocks();

describe("Cashback Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("renders Cashback component with data", async () => {
    const mockData = [
      {
        id: 1,
        description: "Cashback 1",
        transactionTime: "2024-01-10",
        cashbackAmount: 10,
      },
      {
        id: 2,
        description: "Cashback 2",
        transactionTime: "2024-01-11",
        cashbackAmount: 20,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    render(
      <BrowserRouter>
        <Cashback />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Cashbacks")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Cashback 1")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Cashback 2")).toBeInTheDocument();
    });
  });

  it("renders Cashback component with error", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    render(
      <BrowserRouter>
        <Cashback />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Network error. Please try again later.")
      ).toBeInTheDocument();
    });
  });
});
