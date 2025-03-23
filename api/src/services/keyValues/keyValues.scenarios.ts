import type { Prisma, KeyValue } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.KeyValueCreateArgs>({
    keyValue: {
        one: {
            data: {
                key: "String",
                value: "String",
                user: { create: { clerkId: "String", email: "String8872112" } },
            },
        },
        two: {
            data: {
                key: "String",
                value: "String",
                user: { create: { clerkId: "String", email: "String5152240" } },
            },
        },
    },
})

export type StandardScenario = ScenarioData<KeyValue, "keyValue">
