import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../Layout';

// Mock the Leftpanel and Rightpanel components
jest.mock('../Leftpanel', () => ({ onSelectButton }) => (
  <div data-testid="left-panel" onClick={() => onSelectButton('mockButton')}>
    Mock Leftpanel
  </div>
));

jest.mock('../Rightpanel', () => ({ selectedButton }) => (
  <div data-testid="right-panel">
    Mock Rightpanel - Selected Button: {selectedButton}
  </div>
));

describe('Layout Component', () => {
  it('renders Layout component with default selected button', () => {
    render(<Layout />);

    const defaultRightPanelContent = screen.getByText('Mock Rightpanel - Selected Button: dashboard');
    expect(defaultRightPanelContent).toBeInTheDocument();
  });

  it('updates the selected button when a button is clicked in Leftpanel', () => {
    render(<Layout />);

    const leftPanel = screen.getByTestId('left-panel');
    fireEvent.click(leftPanel);

    const updatedRightPanelContent = screen.getByText('Mock Rightpanel - Selected Button: mockButton');
    expect(updatedRightPanelContent).toBeInTheDocument();
  });

});
