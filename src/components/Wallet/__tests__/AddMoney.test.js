import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Addmoney from "../Addmoney";
import "@testing-library/jest-dom";
import { getAuthToken } from "../../../utils/Auth";

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

describe("Addmoney component tests", () => {
  it("displays error message for empty amount", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Addmoney />
      </MemoryRouter>
    );
    const addAmountButton = getByText("Add Amount");
    fireEvent.click(addAmountButton);

    await waitFor(() => {
      const errorMessage = getByText("Please enter a valid amount.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("displays error message for invalid amount", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Addmoney />
      </MemoryRouter>
    );
    const amountInput = getByPlaceholderText("Amount");
    fireEvent.change(amountInput, { target: { value: "invalid" } });
    const addAmountButton = getByText("Add Amount");
    fireEvent.click(addAmountButton);
    await waitFor(() => {
      const errorMessage = getByText("Please enter a valid amount value.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("displays success message for a valid amount", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");

    fetchSpy.mockResolvedValueOnce({
      status: 200,
      json: jest.fn(() => ({ description: "Transaction successful" })),
    });

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Addmoney />
      </MemoryRouter>
    );

    const amountInput = getByPlaceholderText("Amount");
    fireEvent.change(amountInput, { target: { value: "50" } });

    const addAmountButton = getByText("Add Amount");
    fireEvent.click(addAmountButton);

    await waitFor(() => {
      const successMessage = getByText("Success, Transaction successful");
      expect(successMessage).toBeInTheDocument();
    });

    fetchSpy.mockRestore();
  });

  it("displays an error message for a negative amount", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Addmoney />
      </MemoryRouter>
    );

    const amountInput = getByPlaceholderText("Amount");
    fireEvent.change(amountInput, { target: { value: "-50" } });

    const addAmountButton = getByText("Add Amount");
    fireEvent.click(addAmountButton);

    const errorMessage = await waitFor(() =>
      getByText("Please enter a valid amount value.")
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("redirects to the signin page on a 401 status", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");

    // Mock the getAuthToken function to return the token
    getAuthToken.mockReturnValue("mockedToken");
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "123"),
      },
      writable: true,
    });

    fetchSpy.mockResolvedValueOnce({
      status: 401,
      json: jest.fn(),
    });

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Addmoney />
      </MemoryRouter>
    );

    const amountInput = getByPlaceholderText("Amount");
    fireEvent.change(amountInput, { target: { value: "50" } });

    const addAmountButton = getByText("Add Amount");
    fireEvent.click(addAmountButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/transactions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer mockedToken",
          },
          body: '{"senderAccountNumber":"123","receiverAccountNumber":"","amount":"50","transactionType":"CREDIT"}',
        }
      );
    });

    expect(useNavigate).toHaveBeenCalled();

    // const errorMessage = await waitFor(() => getByText("Network error. Please try again later."));
    // expect(errorMessage).toBeInTheDocument();

    fetchSpy.mockRestore();
  });

  // Add more test cases as needed
});
