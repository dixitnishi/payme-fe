import { render, screen } from "@testing-library/react"
import Leftpanel from "../Leftpanel"
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event"


describe("LeftPanel component",()=>{
    it("Renders left layout",()=>{
        render(<Leftpanel/>)
        const heading = screen.getByRole("heading",{name:/payme/i});
        expect(heading).toBeInTheDocument();

        const dashboardButton = screen.getByText(/dashboard/i);
        expect(dashboardButton).toBeInTheDocument();

        const walletOpsButton = screen.getByText(/Wallet Operations/i);
        expect(walletOpsButton).toBeInTheDocument();

        const transactionsButton = screen.getByText(/Transactions/i);
        expect(transactionsButton).toBeInTheDocument();

        const cashbacksButton = screen.getByText(/Cashbacks/i);
        expect(cashbacksButton).toBeInTheDocument();
    })

    it('calls onSelectButton with "dashboard" when Dashboard button is clicked', () => {
        const onSelectButtonMock = jest.fn();
        render(<Leftpanel onSelectButton={onSelectButtonMock} />);

        const dashboardButton = screen.getByText(/dashboard/i);
    
        userEvent.click(dashboardButton);
    
        expect(onSelectButtonMock).toHaveBeenCalledWith('dashboard');
      });
    
      it('calls onSelectButton with "operations" when Wallet Operations button is clicked', () => {
        const onSelectButtonMock = jest.fn();
        render(<Leftpanel onSelectButton={onSelectButtonMock} />);
    
        const walletOpsButton = screen.getByText(/Wallet Operations/i);
        userEvent.click(walletOpsButton);
    
        expect(onSelectButtonMock).toHaveBeenCalledWith('operations');
      });
    
      it('calls onSelectButton with "transactions" when Transactions button is clicked', () => {
        const onSelectButtonMock = jest.fn();
        render(<Leftpanel onSelectButton={onSelectButtonMock} />);
    
        const transactionsButton = screen.getByText(/Transactions/i);
        userEvent.click(transactionsButton);
    
        expect(onSelectButtonMock).toHaveBeenCalledWith('transactions');
      });
    
      it('calls onSelectButton with "cashbacks" when Cashbacks button is clicked', () => {
        const onSelectButtonMock = jest.fn();
        render(<Leftpanel onSelectButton={onSelectButtonMock} />);
    
        const cashbacksButton = screen.getByText(/Cashbacks/i);
        userEvent.click(cashbacksButton);
    
        expect(onSelectButtonMock).toHaveBeenCalledWith('cashbacks');
      });

})