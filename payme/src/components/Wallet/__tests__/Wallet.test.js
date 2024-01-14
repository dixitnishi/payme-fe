import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import Wallet from "../Wallet";
import Addmoney from "../Addmoney";
import Transfermoney from "../Transfermoney";


jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});


describe("Wallet component tests", () => {
  it("renders Addmoney component by default", () => {
    const { getByText } = render(<Wallet />);
    const addMoneyButton = getByText("Wallet Operations");
    expect(addMoneyButton).toBeInTheDocument();
  });

  it("switches to Transfermoney component on button click", async () => {
    const { getByText } = render(<Wallet />);
    const transferMoneyButton = getByText("Transfer Amount");
    fireEvent.click(transferMoneyButton);
    const transferMoneyComponent = await waitFor(() =>
      getByText("Benificiary Wallet Id / Acc. Id")
    );
    expect(transferMoneyComponent).toBeInTheDocument();
  });

  it("switches back to Addmoney component on button click", async () => {
    const { getByText } = render(<Wallet />);
    const transferMoneyButton = getByText("Transfer Amount");
    fireEvent.click(transferMoneyButton);
    const addMoneyButton = await waitFor(() => getByText("Add Amount"));
    fireEvent.click(addMoneyButton);
    const addMoneyComponent = await waitFor(() =>
      getByText("Amount")
    );
    expect(addMoneyComponent).toBeInTheDocument();
  });

  it("displays Add amount page by default", async () => {
    const { getAllByText } = render(<Wallet />);
    const addMoneyComponent = await waitFor(() =>
      getAllByText("Add Amount")
    );
    expect(addMoneyComponent).toHaveLength(2)
  });
});
