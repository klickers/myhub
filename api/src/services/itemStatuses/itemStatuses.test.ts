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

    scenario("creates a itemStatus", async () => {
        const result = await createItemStatus({
            input: { status: "String9806333" },
        })

        expect(result.status).toEqual("String9806333")
    })

    scenario("updates a itemStatus", async (scenario: StandardScenario) => {
        const original = (await itemStatus({
            id: scenario.itemStatus.one.id,
        })) as ItemStatus
        const result = await updateItemStatus({
            id: original.id,
            input: { status: "String23544422" },
        })

        expect(result.status).toEqual("String23544422")
    })

    scenario("deletes a itemStatus", async (scenario: StandardScenario) => {
        const original = (await deleteItemStatus({
            id: scenario.itemStatus.one.id,
        })) as ItemStatus
        const result = await itemStatus({ id: original.id })

        expect(result).toEqual(null)
    })
})
