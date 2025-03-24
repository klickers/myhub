import type { Prisma, GoogleCalendarLink } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.GoogleCalendarLinkCreateArgs>({
    googleCalendarLink: {
        one: {
            data: {
                calendarLink: "String",
                user: { create: { clerkId: "String", email: "String1115142" } },
            },
        },
        two: {
            data: {
                calendarLink: "String",
                user: { create: { clerkId: "String", email: "String8592220" } },
            },
        },
    },
})

export type StandardScenario = ScenarioData<
    GoogleCalendarLink,
    "googleCalendarLink"
>
