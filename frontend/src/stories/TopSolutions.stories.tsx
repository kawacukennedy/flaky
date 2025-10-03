import type { Meta, StoryObj } from '@storybook/react';
import TopSolutions from '../components/dashboard/TopSolutions';

const meta = {
  title: 'Dashboard/TopSolutions',
  component: TopSolutions,
  parameters: {
    layout: 'centered',
    a11y: { // Enable a11y checks for this component
      element: '#storybook-root',
      config: {},
      options: {},
      manual: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    solutions: {
      control: 'object',
      description: 'Array of top solutions',
    },
  },
} satisfies Meta<typeof TopSolutions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    solutions: [
      { id: '1', title: 'Fixing Null Pointer Exception', snippet: 'Add null checks before accessing object properties.', votes: 15 },
      { id: '2', title: 'Optimizing Database Queries', snippet: 'Use indexing and limit clauses for large datasets.', votes: 12 },
      { id: '3', title: 'Handling Async Operations in Tests', snippet: 'Utilize async/await with proper test utilities.', votes: 8 },
      { id: '4', title: 'Resolving CORS Issues', snippet: 'Configure backend to allow cross-origin requests from frontend.', votes: 7 },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    solutions: [],
  },
};
