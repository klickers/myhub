import type { Prisma, ItemStatus } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.ItemStatusCreateArgs>({
    itemStatus: {
        one: {
            data: {
                status: "String",
                user: { create: { clerkId: "String", email: "String4172139" } },
            },
        },
        two: {
            data: {
                status: "String",
                user: { create: { clerkId: "String", email: "String5745911" } },
            },
        },
    },
})

export type StandardScenario = ScenarioData<ItemStatus, "itemStatus">
