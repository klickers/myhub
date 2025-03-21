import type { TimeBlockType } from "@prisma/client"

import {
    timeBlockTypes,
    timeBlockType,
    createTimeBlockType,
    updateTimeBlockType,
    deleteTimeBlockType,
} from "./timeBlockTypes"
import type { StandardScenario } from "./timeBlockTypes.scenarios"

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("timeBlockTypes", () => {
    scenario(
        "returns all timeBlockTypes",
        async (scenario: StandardScenario) => {
            const result = await timeBlockTypes()

            expect(result.length).toEqual(
                Object.keys(scenario.timeBlockType).length
            )
        }
    )

    scenario(
        "returns a single timeBlockType",
        async (scenario: StandardScenario) => {
            const result = await timeBlockType({
                id: scenario.timeBlockType.one.id,
            })

            expect(result).toEqual(scenario.timeBlockType.one)
        }
    )

    scenario("creates a timeBlockType", async (scenario: StandardScenario) => {
        const result = await createTimeBlockType({
            input: {
                name: "String",
                userId: scenario.timeBlockType.two.userId,
            },
        })

        expect(result.name).toEqual("String")
        expect(result.userId).toEqual(scenario.timeBlockType.two.userId)
    })

    scenario("updates a timeBlockType", async (scenario: StandardScenario) => {
        const original = (await timeBlockType({
            id: scenario.timeBlockType.one.id,
        })) as TimeBlockType
        const result = await updateTimeBlockType({
            id: original.id,
            input: { name: "String2" },
        })

        expect(result.name).toEqual("String2")
    })

    scenario("deletes a timeBlockType", async (scenario: StandardScenario) => {
        const original = (await deleteTimeBlockType({
            id: scenario.timeBlockType.one.id,
        })) as TimeBlockType
        const result = await timeBlockType({ id: original.id })

        expect(result).toEqual(null)
    })
})
