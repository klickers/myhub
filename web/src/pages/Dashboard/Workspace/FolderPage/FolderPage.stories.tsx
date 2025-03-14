import type { Meta, StoryObj } from "@storybook/react"

import FolderPage from "./FolderPage"

const meta: Meta<typeof FolderPage> = {
    component: FolderPage,
}

export default meta

type Story = StoryObj<typeof FolderPage>

export const Primary: Story = {}
