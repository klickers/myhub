import type { Prisma, User } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.UserCreateArgs>({
    user: {
        one: { data: { clerkId: "String9069244", email: "String50120" } },
        two: { data: { clerkId: "String9151384", email: "String7261891" } },
    },
})

export type StandardScenario = ScenarioData<User, "user">
