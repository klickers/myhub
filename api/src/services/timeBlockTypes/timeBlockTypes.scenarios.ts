import type { Prisma, TimeBlockType } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.TimeBlockTypeCreateArgs>({
    timeBlockType: {
        one: {
            data: {
                name: "String",
                user: { create: { clerkId: "String", email: "String9752439" } },
            },
        },
        two: {
            data: {
                name: "String",
                user: { create: { clerkId: "String", email: "String8466247" } },
            },
        },
    },
})

export type StandardScenario = ScenarioData<TimeBlockType, "timeBlockType">
