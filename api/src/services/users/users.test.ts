import type { User } from "@prisma/client"

import { users, user, createUser, updateUser, deleteUser } from "./users"
import type { StandardScenario } from "./users.scenarios"

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("users", () => {
    scenario("returns all users", async (scenario: StandardScenario) => {
        const result = await users()

        expect(result.length).toEqual(Object.keys(scenario.user).length)
    })

    scenario("returns a single user", async (scenario: StandardScenario) => {
        const result = await user({ clerkId: scenario.user.one.clerkId })

        expect(result).toEqual(scenario.user.one)
    })

    scenario("creates a user", async () => {
        const result = await createUser({
            input: { clerkId: "String", email: "String6535946" },
        })

        expect(result.clerkId).toEqual("String")
        expect(result.email).toEqual("String6535946")
    })

    scenario("updates a user", async (scenario: StandardScenario) => {
        const original = (await user({
            clerkId: scenario.user.one.clerkId,
        })) as User
        const result = await updateUser({
            clerkId: original.clerkId,
            input: { clerkId: "String2" },
        })

        expect(result.clerkId).toEqual("String2")
    })

    scenario("deletes a user", async (scenario: StandardScenario) => {
        const original = (await deleteUser({
            clerkId: scenario.user.one.clerkId,
        })) as User
        const result = await user({ clerkId: original.clerkId })

        expect(result).toEqual(null)
    })
})
