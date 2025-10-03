import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';

// Mock data for child components
const mockSearchResults = [
  { id: '1', title: 'Flaky Test in Login Module', snippet: 'Found an intermittent failure in the user login flow...', source: 'CI Logs', date: '2023-10-26' },
  { id: '2', title: 'High Flakiness in Payment Gateway', snippet: 'Analysis shows frequent failures in the payment processing...', source: 'GitHub', date: '2023-10-25' },
  { id: '3', title: 'Documentation for FlakeHunter Search', snippet: 'Learn how to effectively use the search functionality...', source: 'Docs', date: '2023-10-20' },
];

// Mock the child components for Storybook
jest.mock('../components/search/SearchBar', () => {
  return (props: any) => (
    <SearchBar
      {...props}
      onSearch={(query) => console.log('Mock Search:', query)}
      onFilterChange={(name, value) => console.log('Mock Filter Change:', name, value)}
    />
  );
});

jest.mock('../components/search/SearchResults', () => {
  return (props: any) => <SearchResults {...props} results={mockSearchResults} />;
});

const meta = {
  title: 'Pages/SearchPage',
  component: SearchPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} satisfies Meta<typeof SearchPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
