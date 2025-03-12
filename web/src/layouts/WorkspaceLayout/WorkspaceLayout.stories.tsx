import type { Meta, StoryObj } from "@storybook/react"

import WorkspaceLayout from "./WorkspaceLayout"

const meta: Meta<typeof WorkspaceLayout> = {
    component: WorkspaceLayout,
}

export default meta

type Story = StoryObj<typeof WorkspaceLayout>

export const Primary: Story = {}
