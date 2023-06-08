import React from 'react';
import { render, screen } from '@testing-library/react';
import Mailbox from './Mailbox';

test('renders mailbox component', () => {
  render(<Mailbox />);

  // Check if the search bar is rendered
  const searchBar = screen.getByPlaceholderText('Search');
  expect(searchBar).toBeInTheDocument();

  // Check if the buttons are rendered
  const inboxButton = screen.getByText('Inbox');
  expect(inboxButton).toBeInTheDocument();

  const draftButton = screen.getByText('Draft');
  expect(draftButton).toBeInTheDocument();

  const spamButton = screen.getByText('Spam');
  expect(spamButton).toBeInTheDocument();

  const trashButton = screen.getByText('Trash');
  expect(trashButton).toBeInTheDocument();

  const viewAllButton = screen.getByText('View All');
  expect(viewAllButton).toBeInTheDocument();

  // For "No results found"
  const noResultsMessage = screen.getByText('No results found.');
  expect(noResultsMessage).toBeInTheDocument();
});
