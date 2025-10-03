import type { Meta, StoryObj } from '@storybook/react';
import DetailsPanel from '../components/flakes/DetailsPanel';

const meta = {
  title: 'Flakes/DetailsPanel',
  component: DetailsPanel,
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
    summaryContent: { control: 'text' },
    rootCausesContent: { control: 'text' },
    linkedIssuesContent: { control: 'text' },
  },
} satisfies Meta<typeof DetailsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summaryContent: (
      <div>
        <h4 className="text-lg font-semibold mb-2">Summary of Flaky Test</h4>
        <p>This test, <code>UserLogin.test.ts</code>, has been identified as flaky due to intermittent failures during CI runs. The primary symptom is a timeout during the login process, occurring in approximately 15% of executions.</p>
        <p className="mt-2"><strong>Last Failed:</strong> October 3, 2025, 10:30 AM</p>
        <p><strong>Failure Rate (last 7 days):</strong> 15%</p>
      </div>
    ),
    rootCausesContent: (
      <div>
        <h4 className="text-lg font-semibold mb-2">Potential Root Causes</h4>
        <ul className="list-disc list-inside">
          <li>Network latency issues affecting API calls.</li>
          <li>Race condition in the authentication flow.</li>
          <li>Database contention during user creation/lookup.</li>
          <li>External service dependency timeouts.</li>
        </ul>
      </div>
    ),
    linkedIssuesContent: (
      <div>
        <h4 className="text-lg font-semibold mb-2">Linked Issues</h4>
        <ul className="list-disc list-inside">
          <li><a href="#" className="text-primary hover:underline">GitHub Issue #123: Intermittent Login Timeout</a></li>
          <li><a href="#" className="text-primary hover:underline">Jira-101: Investigate Flaky Auth Test</a></li>
        </ul>
      </div>
    ),
  },
};
