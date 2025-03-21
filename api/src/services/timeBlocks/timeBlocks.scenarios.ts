import type { Prisma, TimeBlock } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.TimeBlockCreateArgs>({
    timeBlock: {
        one: {
            data: {
                start: "2025-03-20T10:05:06.123Z",
                end: "2025-03-20T10:05:06.123Z",
                type: {
                    create: {
                        name: "String",
                        user: {
                            create: {
                                clerkId: "String",
                                email: "String8405530",
                            },
                        },
                    },
                },
                user: { create: { clerkId: "String", email: "String3154918" } },
            },
        },
        two: {
            data: {
                start: "2025-03-20T10:05:06.200Z",
                end: "2025-03-20T10:05:06.200Z",
                type: {
                    create: {
                        name: "String",
                        user: {
                            create: {
                                clerkId: "String",
                                email: "String590992",
                            },
                        },
                    },
                },
                user: { create: { clerkId: "String", email: "String9307236" } },
            },
        },
    },
})

export type StandardScenario = ScenarioData<TimeBlock, "timeBlock">
