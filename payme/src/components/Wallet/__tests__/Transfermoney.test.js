import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Transfermoney from "../Transfermoney";
import { getAuthToken } from "../../../utils/Auth";
import "@testing-library/jest-dom";

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

describe("Transfermoney component tests", () => {
  it("displays success message for a valid amount", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");

    fetchSpy.mockResolvedValueOnce({
      status: 200,
      json: jest.fn(() => ({ description: "Transaction successful" })),
    });

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Transfermoney />
      </MemoryRouter>
    );

    const accountIdInput = getByPlaceholderText("Account Id");
    fireEvent.change(accountIdInput, { target: { value: "98765432" } });

    const amountInput = getByPlaceholderText("Amount");
    fireEvent.change(amountInput, { target: { value: "50" } });

    const addAmountButton = getByText("Transfer Amount");
    fireEvent.click(addAmountButton);

    await waitFor(() => {
      const successMessage = getByText("Success, Transaction successful");
      expect(successMessage).toBeInTheDocument();
    });

    fetchSpy.mockRestore();
  });

  it("redirects to the signin page on a 401 status", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");
    getAuthToken.mockReturnValue("mockedToken");

    // Set the localStorage value
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
        <Transfermoney />
      </MemoryRouter>
    );

    const accountIdInput = getByPlaceholderText("Account Id");
    fireEvent.change(accountIdInput, { target: { value: "98765432" } });

    const amountInput = getByPlaceholderText("Amount");
    fireEvent.change(amountInput, { target: { value: "50" } });

    const transferAmountButton = getByText("Transfer Amount");
    fireEvent.click(transferAmountButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/transactions/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer mockedToken",
          },
          body: '{"senderAccountNumber":"123","receiverAccountNumber":"98765432","amount":"50","transactionType":"DEBIT"}',
        }
      );
    });

    expect(useNavigate).toHaveBeenCalled();

    fetchSpy.mockRestore();
  });

  it("displays an error message for an invalid transfer amount", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Transfermoney />
      </MemoryRouter>
    );

    const accountIdInput = getByPlaceholderText("Account Id");
    const amountInput = getByPlaceholderText("Amount");

    fireEvent.change(accountIdInput, { target: { value: "98765432" } });
    fireEvent.change(amountInput, { target: { value: "-50" } });

    const transferButton = getByText("Transfer Amount");
    fireEvent.click(transferButton);

    await waitFor(() => {
      const errorMessage = getByText("Please enter a valid amount value.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("displays an error message for no transfer amount", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Transfermoney />
      </MemoryRouter>
    );
    const accountIdInput = getByPlaceholderText("Account Id");
    fireEvent.change(accountIdInput, { target: { value: "98765432" } });
    const transferButton = getByText("Transfer Amount");
    fireEvent.click(transferButton);
    await waitFor(() => {
      const errorMessage = getByText("Please enter a valid amount.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("displays an error message for invalid wallet id digits > 8", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Transfermoney />
      </MemoryRouter>
    );
    const accountIdInput = getByPlaceholderText("Account Id");
    fireEvent.change(accountIdInput, { target: { value: "9876543212" } });
    const transferButton = getByText("Transfer Amount");
    fireEvent.click(transferButton);
    await waitFor(() => {
      const errorMessage = getByText(
        "Wallet Id should be of length 8. Thanks!"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("displays an error message for invalid wallet id digits < 8", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Transfermoney />
      </MemoryRouter>
    );
    const accountIdInput = getByPlaceholderText("Account Id");
    fireEvent.change(accountIdInput, { target: { value: "987654" } });
    const transferButton = getByText("Transfer Amount");
    fireEvent.click(transferButton);
    await waitFor(() => {
      const errorMessage = getByText(
        "Wallet Id should be of length 8. Thanks!"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("displays an error message for no wallet id entered", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Transfermoney />
      </MemoryRouter>
    );
    const transferButton = getByText("Transfer Amount");
    fireEvent.click(transferButton);
    await waitFor(() => {
      const errorMessage = getByText(
        "Wallet Id should be of length 8. Thanks!"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
