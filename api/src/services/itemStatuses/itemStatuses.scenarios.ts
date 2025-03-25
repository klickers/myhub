import type { Prisma, ItemStatus } from "@prisma/client"

import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.ItemStatusCreateArgs>({
    itemStatus: {
        one: {
            data: {
                name: "String",
                code: "OPEN",
                user: { create: { clerkId: "String", email: "String3228790" } },
            },
        },
        two: {
            data: {
                name: "String",
                code: "OPEN",
                user: { create: { clerkId: "String", email: "String7459284" } },
            },
        },
    },
})

export type StandardScenario = ScenarioData<ItemStatus, "itemStatus">
