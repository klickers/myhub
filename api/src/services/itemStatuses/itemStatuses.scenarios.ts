import type { Prisma, ItemStatus } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.ItemStatusCreateArgs>({
    itemStatus: {
        one: { data: { status: "String8451966" } },
        two: { data: { status: "String1091313" } },
    },
})

export type StandardScenario = ScenarioData<ItemStatus, "itemStatus">
