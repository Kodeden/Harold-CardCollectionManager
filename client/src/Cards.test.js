import { render, screen } from '@testing-library/react';
import NewCard from './components/NewCard.js';
import React from 'react';

describe("The default values for search criteria appear onscreen", () => {

  it("Card Name", () => {
      render(<NewCard />);
      const input = screen.getByPlaceholderText("Card Name");
      expect(input.value).toBe("");
  });

});
