import { render, screen } from '@testing-library/react';
import RandomQuote from './RandomQuote';

test('renders RandomQuote', () => {
  render(<RandomQuote />);
  const linkElement = screen.getByText(/new quote/i);
  expect(linkElement).toBeInTheDocument();
});
