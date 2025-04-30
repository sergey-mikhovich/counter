import {Button} from "@/components/button/Button.tsx";
import {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

const meta = {
    title: 'Counter/Button',
    component: Button,
    args: {
        name: "Click on me",
        disabled: false,
        onClick: fn(),
    },
} satisfies Meta<typeof Button>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Disabled: Story = {
    args: {
        disabled: true
    }
}