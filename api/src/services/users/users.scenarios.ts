import type { Prisma, User } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.UserCreateArgs>({
    user: {
        one: { data: { clerkId: "String", email: "String3452098" } },
        two: { data: { clerkId: "String", email: "String3948472" } },
    },
})

export type StandardScenario = ScenarioData<User, "user">
