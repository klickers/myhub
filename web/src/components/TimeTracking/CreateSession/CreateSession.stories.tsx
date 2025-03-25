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

import CreateSession from "./CreateSession"

const meta: Meta<typeof CreateSession> = {
    component: CreateSession,
    tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CreateSession>

export const Primary: Story = {}
