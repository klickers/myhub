import type { Meta, StoryObj } from "@storybook/react"

import SkillPage from "./SkillPage"

const meta: Meta<typeof SkillPage> = {
    component: SkillPage,
}

export default meta

type Story = StoryObj<typeof SkillPage>

export const Primary: Story = {}
