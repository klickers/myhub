import type { Prisma, Session } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.SessionCreateArgs>({
    session: {
        one: {
            data: {
                type: "PLANNED",
                start: "2025-03-21T10:56:50.910Z",
                end: "2025-03-21T10:56:50.910Z",
                user: { create: { clerkId: "String", email: "String9219417" } },
            },
        },
        two: {
            data: {
                type: "PLANNED",
                start: "2025-03-21T10:56:50.939Z",
                end: "2025-03-21T10:56:50.939Z",
                user: { create: { clerkId: "String", email: "String7120152" } },
            },
        },
    },
})

export type StandardScenario = ScenarioData<Session, "session">
