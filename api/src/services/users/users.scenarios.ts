import type { Prisma, User } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.UserCreateArgs>({
    user: {
        one: { data: { clerkId: "String", email: "String588858" } },
        two: { data: { clerkId: "String", email: "String1897008" } },
    },
})

export type StandardScenario = ScenarioData<User, "user">
