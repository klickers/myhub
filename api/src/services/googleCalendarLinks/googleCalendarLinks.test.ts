import type { GoogleCalendarLink } from "@prisma/client"

import {
    googleCalendarLinks,
    googleCalendarLink,
    createGoogleCalendarLink,
    updateGoogleCalendarLink,
    deleteGoogleCalendarLink,
} from "./googleCalendarLinks"
import type { StandardScenario } from "./googleCalendarLinks.scenarios"

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("googleCalendarLinks", () => {
    scenario(
        "returns all googleCalendarLinks",
        async (scenario: StandardScenario) => {
            const result = await googleCalendarLinks()

            expect(result.length).toEqual(
                Object.keys(scenario.googleCalendarLink).length
            )
        }
    )

    scenario(
        "returns a single googleCalendarLink",
        async (scenario: StandardScenario) => {
            const result = await googleCalendarLink({
                id: scenario.googleCalendarLink.one.id,
            })

            expect(result).toEqual(scenario.googleCalendarLink.one)
        }
    )

    scenario(
        "creates a googleCalendarLink",
        async (scenario: StandardScenario) => {
            const result = await createGoogleCalendarLink({
                input: {
                    calendarLink: "String",
                    userId: scenario.googleCalendarLink.two.userId,
                },
            })

            expect(result.calendarLink).toEqual("String")
            expect(result.userId).toEqual(
                scenario.googleCalendarLink.two.userId
            )
        }
    )

    scenario(
        "updates a googleCalendarLink",
        async (scenario: StandardScenario) => {
            const original = (await googleCalendarLink({
                id: scenario.googleCalendarLink.one.id,
            })) as GoogleCalendarLink
            const result = await updateGoogleCalendarLink({
                id: original.id,
                input: { calendarLink: "String2" },
            })

            expect(result.calendarLink).toEqual("String2")
        }
    )

    scenario(
        "deletes a googleCalendarLink",
        async (scenario: StandardScenario) => {
            const original = (await deleteGoogleCalendarLink({
                id: scenario.googleCalendarLink.one.id,
            })) as GoogleCalendarLink
            const result = await googleCalendarLink({ id: original.id })

            expect(result).toEqual(null)
        }
    )
})
