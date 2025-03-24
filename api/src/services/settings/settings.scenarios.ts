import type { Prisma, Setting } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.SettingCreateArgs>({
    setting: {
        one: {
            data: {
                name: "String",
                value: "String",
                user: { create: { clerkId: "String", email: "String3334897" } },
            },
        },
        two: {
            data: {
                name: "String",
                value: "String",
                user: { create: { clerkId: "String", email: "String7401407" } },
            },
        },
    },
})

export type StandardScenario = ScenarioData<Setting, "setting">
