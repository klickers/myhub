import type { TimeBlock } from "@prisma/client"

import {
    timeBlocks,
    timeBlock,
    createTimeBlock,
    updateTimeBlock,
    deleteTimeBlock,
} from "./timeBlocks"
import type { StandardScenario } from "./timeBlocks.scenarios"

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("timeBlocks", () => {
    scenario("returns all timeBlocks", async (scenario: StandardScenario) => {
        const result = await timeBlocks()

        expect(result.length).toEqual(Object.keys(scenario.timeBlock).length)
    })

    scenario(
        "returns a single timeBlock",
        async (scenario: StandardScenario) => {
            const result = await timeBlock({ id: scenario.timeBlock.one.id })

            expect(result).toEqual(scenario.timeBlock.one)
        }
    )

    scenario("creates a timeBlock", async (scenario: StandardScenario) => {
        const result = await createTimeBlock({
            input: {
                start: "2025-03-20T10:05:05.668Z",
                end: "2025-03-20T10:05:05.668Z",
                typeId: scenario.timeBlock.two.typeId,
                userId: scenario.timeBlock.two.userId,
            },
        })

        expect(result.start).toEqual(new Date("2025-03-20T10:05:05.668Z"))
        expect(result.end).toEqual(new Date("2025-03-20T10:05:05.668Z"))
        expect(result.typeId).toEqual(scenario.timeBlock.two.typeId)
        expect(result.userId).toEqual(scenario.timeBlock.two.userId)
    })

    scenario("updates a timeBlock", async (scenario: StandardScenario) => {
        const original = (await timeBlock({
            id: scenario.timeBlock.one.id,
        })) as TimeBlock
        const result = await updateTimeBlock({
            id: original.id,
            input: { start: "2025-03-21T10:05:05.709Z" },
        })

        expect(result.start).toEqual(new Date("2025-03-21T10:05:05.709Z"))
    })

    scenario("deletes a timeBlock", async (scenario: StandardScenario) => {
        const original = (await deleteTimeBlock({
            id: scenario.timeBlock.one.id,
        })) as TimeBlock
        const result = await timeBlock({ id: original.id })

        expect(result).toEqual(null)
    })
})
