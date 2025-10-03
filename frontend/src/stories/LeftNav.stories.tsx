import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LeftNav from '../components/layout/LeftNav';

const meta = {
  title: 'Layout/LeftNav',
  component: LeftNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Router>
        <div className="flex h-screen">
          <Story />
          <div className="flex-1 p-4">
            {/* Content area to show layout alongside LeftNav */}
            <h1 className="text-2xl font-bold">Main Content Area</h1>
            <p>This is a placeholder for the main content to demonstrate the LeftNav layout.</p>
          </div>
        </div>
      </Router>
    ),
  ],
} satisfies Meta<typeof LeftNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ActiveFlakes: Story = {
  parameters: {
    reactRouter: {
      routePath: '/flakes',
      // You can also specify search, hash, etc.
    },
  },
  args: {},
};

export const ActiveProfile: Story = {
  parameters: {
    reactRouter: {
      routePath: '/profile',
    },
  },
  args: {},
};
