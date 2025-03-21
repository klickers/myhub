// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/7/writing-stories/args

import type { Meta, StoryObj } from "@storybook/react"

import CreateTimeBlockType from "./CreateTimeBlockType"

const meta: Meta<typeof CreateTimeBlockType> = {
    component: CreateTimeBlockType,
    tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CreateTimeBlockType>

export const Primary: Story = {}
