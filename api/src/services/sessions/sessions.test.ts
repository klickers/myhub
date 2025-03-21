import type { Session } from "@prisma/client"

import {
    sessions,
    session,
    createSession,
    updateSession,
    deleteSession,
} from "./sessions"
import type { StandardScenario } from "./sessions.scenarios"

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("sessions", () => {
    scenario("returns all sessions", async (scenario: StandardScenario) => {
        const result = await sessions()

        expect(result.length).toEqual(Object.keys(scenario.session).length)
    })

    scenario("returns a single session", async (scenario: StandardScenario) => {
        const result = await session({ id: scenario.session.one.id })

        expect(result).toEqual(scenario.session.one)
    })

    scenario("creates a session", async (scenario: StandardScenario) => {
        const result = await createSession({
            input: {
                type: "PLANNED",
                start: "2025-03-21T10:56:50.669Z",
                end: "2025-03-21T10:56:50.669Z",
                userId: scenario.session.two.userId,
            },
        })

        expect(result.type).toEqual("PLANNED")
        expect(result.start).toEqual(new Date("2025-03-21T10:56:50.669Z"))
        expect(result.end).toEqual(new Date("2025-03-21T10:56:50.669Z"))
        expect(result.userId).toEqual(scenario.session.two.userId)
    })

    scenario("updates a session", async (scenario: StandardScenario) => {
        const original = (await session({
            id: scenario.session.one.id,
        })) as Session
        const result = await updateSession({
            id: original.id,
            input: { type: "TRACKED" },
        })

        expect(result.type).toEqual("TRACKED")
    })

    scenario("deletes a session", async (scenario: StandardScenario) => {
        const original = (await deleteSession({
            id: scenario.session.one.id,
        })) as Session
        const result = await session({ id: original.id })

        expect(result).toEqual(null)
    })
})
