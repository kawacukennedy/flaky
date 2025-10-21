import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SolutionCard from '../components/solutions/SolutionCard';

const meta = {
  title: 'Solutions/SolutionCard',
  component: SolutionCard,
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
    title: { control: 'text' },
    snippet: { control: 'text' },
    source: { control: 'text' },
    tags: { control: 'object' },
    votes: { control: 'number' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof SolutionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Fixing Null Pointer Exception',
    snippet: '```java\npublic void safeMethod(Object obj) {\n  if (obj != null) {\n    obj.doSomething();\n  }\n}\n```\nAdd null checks before accessing object properties to prevent NullPointerExceptions. This ensures your application handles unexpected null values gracefully, improving stability and reducing crashes. Consider using Optional in Java 8+ for more idiomatic null handling.',
    source: 'https://stackoverflow.com/questions/example',
    tags: ['Java', 'Error Handling', 'Best Practice'],
    votes: 15,
  },
};

export const LongSnippet: Story = {
  args: {
    title: 'Optimizing Database Queries for Performance',
    snippet: '```sql\nSELECT * FROM users WHERE created_at < NOW() - INTERVAL \'1 year\' ORDER BY created_at DESC LIMIT 100;\n```\nOptimize database queries by adding appropriate indexes to frequently queried columns, using LIMIT for pagination, and avoiding SELECT * in production code. This reduces the load on your database and speeds up data retrieval, leading to a more responsive application. Also, consider eager loading for ORMs.',
    source: 'https://docs.example.com/db-optimization',
    tags: ['SQL', 'Performance', 'Database', 'Optimization'],
    votes: 30,
  },
};

export const ZeroVotes: Story = {
  args: {
    title: 'Understanding Event Loop in JavaScript',
    snippet: 'The JavaScript event loop is a crucial part of its concurrency model. It handles asynchronous callbacks by pushing them to a queue and processing them when the call stack is empty. Understanding this mechanism is key to writing non-blocking code and avoiding common performance pitfalls in Node.js and browser environments.',
    source: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop',
    tags: ['JavaScript', 'Concurrency', 'Event Loop'],
    votes: 0,
  },
};