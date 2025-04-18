import type { Meta, StoryObj } from "@storybook/react"

import IndexPage from "./IndexPage"

const meta: Meta<typeof IndexPage> = {
    component: IndexPage,
}

export default meta

type Story = StoryObj<typeof IndexPage>

export const Primary: Story = {}
