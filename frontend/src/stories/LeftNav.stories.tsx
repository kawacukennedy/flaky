import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import LeftNav from '../components/layout/LeftNav';

const meta: Meta<typeof LeftNav> = {
  title: 'Layout/LeftNav',
  component: LeftNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ height: '100vh', display: 'flex' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LeftNav>;

export const Default: Story = {};
