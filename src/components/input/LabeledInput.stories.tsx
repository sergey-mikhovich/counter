import {LabeledInput} from "@/components/input/LabeledInput.tsx";
import {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import {useState} from "react";

const meta = {
    title: "Counter/LabeledInput",
    component: LabeledInput,
    args: {
        label: "",
        value: "",
        onChange: fn().mockImplementation((value: string) => {
            console.log(value);
        }),
        error: false,
    },
    render: (args) => <LabeledInputWithHooks {...args} />
} satisfies Meta<typeof LabeledInput>

export default meta;
type Story = StoryObj<typeof meta>

function LabeledInputWithHooks(props) {
    const [value, setValue] = useState<string>(props.value);

    return <LabeledInput label={props.label} value={value} error={props.error} onChange={setValue}/>
}

export const Empty = {}

export const WithLabel = {
    args: {
        label: "Lorem Ipsum",
    }
}

export const WithInputText = {
    args: {
        value: "5",
    }
}

export const WithLabelAndInputText = {
    args: {
        ...WithInputText.args,
        ...WithLabel.args
    }
}

export const WithError = {
    args: {
        error: true,
        value: "-1",
    }
}

export const WithLabelAndInputTextAndError = {
    args: {
        ...WithInputText.args,
        ...WithLabel.args,
        ...WithError.args
    }
}