import type { ItemStatus } from "@prisma/client"

import {
    itemStatuses,
    itemStatus,
    createItemStatus,
    updateItemStatus,
    deleteItemStatus,
} from "./itemStatuses"
import type { StandardScenario } from "./itemStatuses.scenarios"

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("itemStatuses", () => {
    scenario("returns all itemStatuses", async (scenario: StandardScenario) => {
        const result = await itemStatuses()

        expect(result.length).toEqual(Object.keys(scenario.itemStatus).length)
    })

    scenario(
        "returns a single itemStatus",
        async (scenario: StandardScenario) => {
            const result = await itemStatus({ id: scenario.itemStatus.one.id })

            expect(result).toEqual(scenario.itemStatus.one)
        }
    )

    scenario("creates a itemStatus", async (scenario: StandardScenario) => {
        const result = await createItemStatus({
            input: {
                name: "String",
                code: "OPEN",
                userId: scenario.itemStatus.two.userId,
            },
        })

        expect(result.name).toEqual("String")
        expect(result.code).toEqual("OPEN")
        expect(result.userId).toEqual(scenario.itemStatus.two.userId)
    })

    scenario("updates a itemStatus", async (scenario: StandardScenario) => {
        const original = (await itemStatus({
            id: scenario.itemStatus.one.id,
        })) as ItemStatus
        const result = await updateItemStatus({
            id: original.id,
            input: { name: "String2" },
        })

        expect(result.name).toEqual("String2")
    })

    scenario("deletes a itemStatus", async (scenario: StandardScenario) => {
        const original = (await deleteItemStatus({
            id: scenario.itemStatus.one.id,
        })) as ItemStatus
        const result = await itemStatus({ id: original.id })

        expect(result).toEqual(null)
    })
})
