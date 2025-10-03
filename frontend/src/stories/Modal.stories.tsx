import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the modal.',
    },
    onClose: { action: 'closed', description: 'Callback function when the modal is requested to be closed.' },
    title: {
      control: 'text',
      description: 'The title displayed in the modal header.',
    },
    children: {
      control: 'text',
      description: 'The content to be rendered inside the modal body.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const Template: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    const handleClose = () => {
      setIsOpen(false);
      args.onClose();
    };
    return (
      <>
        <Button label="Open Modal" onClick={() => setIsOpen(true)} />
        <Modal {...args} isOpen={isOpen} onClose={handleClose} />
      </>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    isOpen: false,
    title: 'Modal Title',
    children: (
      <p>
        This is the content of the modal. You can put any React nodes here.
        It supports text, other components, forms, etc.
      </p>
    ),
  },
};

export const WithLongContent: Story = {
  ...Template,
  args: {
    isOpen: false,
    title: 'Modal with Long Content',
    children: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
      </div>
    ),
  },
};

export const CustomTitleAndButton: Story = {
  ...Template,
  args: {
    isOpen: false,
    title: 'Custom Action Required',
    children: (
      <div className="space-y-4">
        <p>Please confirm your action below.</p>
        <div className="flex justify-end space-x-2">
          <Button label="Cancel" variant="secondary" onClick={() => alert('Cancel clicked')} />
          <Button label="Confirm" variant="primary" onClick={() => alert('Confirm clicked')} />
        </div>
      </div>
    ),
  },
};
