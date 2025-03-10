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

import SidebarButton from "./SidebarButton"

const meta: Meta<typeof SidebarButton> = {
    component: SidebarButton,
    tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SidebarButton>

export const Primary: Story = {}
