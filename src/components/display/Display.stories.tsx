import {Display} from "@/components/display/Display.tsx";
import {Meta, StoryObj} from "@storybook/react";

const meta = {
    title: "Counter/Display",
    component: Display,
} satisfies Meta<typeof Display>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary = {
    args: {
        value: "5"
    }
}

export const Error = {
    args: {
        ...Primary.args,
        error: "Something went wrong"
    }
}

export const Prompt = {
    args: {
        ...Primary.args,
        prompt: "Press \"SET\" to save value"
    }
}