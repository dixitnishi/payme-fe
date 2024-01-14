import React from "react";
import { render, screen, fireEvent,act,waitFor } from "@testing-library/react";
import SignoutModal from "../SignoutModal";

// Mocking react-modal module
jest.mock("react-modal");

describe("SignoutModal component tests", () => {

    test("renders modal when isOpen is true", async () => {
        act(() => {
          render(
            <SignoutModal isOpen={true} onRequestClose={() => {}} handleSignout={() => {}} />
          );
        });
    
        // Wait for the modal content to be present
        await waitFor(() => {
          const modalContent = screen.getByText(/Are you sure you want to sign out/i);
          expect(modalContent).toBeInTheDocument();
        });
      });
//   test("renders modal when isOpen is true", () => {
//     render(
//       <SignoutModal isOpen={true} onRequestClose={() => {}} handleSignout={() => {}} />
//     );

//     const modalContent = screen.getByText("Are you sure you want to sign out?");
//     expect(modalContent).toBeInTheDocument();
//   });

//   test("does not render modal when isOpen is false", () => {
//     render(
//       <SignoutModal isOpen={false} onRequestClose={() => {}} handleSignout={() => {}} />
//     );

//     const modalContent = screen.queryByText("Are you sure you want to sign out?");
//     expect(modalContent).not.toBeInTheDocument();
//   });

//   test("calls onRequestClose when 'No' button is clicked", () => {
//     const onRequestCloseMock = jest.fn();
//     render(
//       <SignoutModal isOpen={true} onRequestClose={onRequestCloseMock} handleSignout={() => {}} />
//     );

//     const noButton = screen.getByText("No");
//     fireEvent.click(noButton);

//     expect(onRequestCloseMock).toHaveBeenCalled();
//   });

//   test("calls handleSignout when 'Yes' button is clicked", () => {
//     const handleSignoutMock = jest.fn();
//     render(
//       <SignoutModal isOpen={true} onRequestClose={() => {}} handleSignout={handleSignoutMock} />
//     );

//     const yesButton = screen.getByText("Yes");
//     fireEvent.click(yesButton);

//     expect(handleSignoutMock).toHaveBeenCalled();
//   });
});
