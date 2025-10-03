import type { Meta, StoryObj } from '@storybook/react';
import SolutionCard from '../components/solutions/SolutionCard';

const meta: Meta<typeof SolutionCard> = {
  title: 'Solutions/SolutionCard',
  component: SolutionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    snippet: { control: 'text' },
    source: { control: 'text' },
    tags: { control: 'object' },
    votes: { control: 'number' },
    fullContent: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Fixing Intermittent Test Failures',
    snippet: 'A common cause of flaky tests is reliance on external services or timing issues. Implement proper mocking and use deterministic delays.',
    source: 'Internal Wiki',
    tags: ['flaky', 'testing', 'best-practices'],
    votes: 42,
    fullContent: 'Full detailed guide on fixing intermittent test failures, including code examples and common pitfalls.',
  },
};

export const WithLongSnippet: Story = {
  args: {
    title: 'Advanced CI/CD Pipeline Optimization for Flaky Tests',
    snippet: 'This solution delves into advanced techniques for optimizing your CI/CD pipeline to automatically detect, quarantine, and analyze flaky tests, significantly reducing developer overhead and improving release confidence. It covers dynamic test selection, intelligent re-runs, and integration with AI-powered root cause analysis tools.',
    source: 'Engineering Blog',
    tags: ['ci/cd', 'automation', 'devops', 'advanced'],
    votes: 128,
    fullContent: 'Detailed article on advanced CI/CD pipeline optimization...', 
  },
};

export const ZeroVotes: Story = {
  args: {
    title: 'New Solution Idea',
    snippet: 'This is a brand new idea for a solution that hasn\'t received any votes yet.',
    source: 'Community Submission',
    tags: ['new', 'idea'],
    votes: 0,
    fullContent: 'Details of the new solution idea.',
  },
};
