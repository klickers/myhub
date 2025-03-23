import type { KeyValue } from "@prisma/client"

import {
    keyValues,
    keyValue,
    createKeyValue,
    updateKeyValue,
    deleteKeyValue,
} from "./keyValues"
import type { StandardScenario } from "./keyValues.scenarios"

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("keyValues", () => {
    scenario("returns all keyValues", async (scenario: StandardScenario) => {
        const result = await keyValues()

        expect(result.length).toEqual(Object.keys(scenario.keyValue).length)
    })

    scenario(
        "returns a single keyValue",
        async (scenario: StandardScenario) => {
            const result = await keyValue({ key: scenario.keyValue.one.key })

            expect(result).toEqual(scenario.keyValue.one)
        }
    )

    scenario("creates a keyValue", async (scenario: StandardScenario) => {
        const result = await createKeyValue({
            input: {
                key: "String",
                value: "String",
                userId: scenario.keyValue.two.userId,
            },
        })

        expect(result.key).toEqual("String")
        expect(result.value).toEqual("String")
        expect(result.userId).toEqual(scenario.keyValue.two.userId)
    })

    scenario("updates a keyValue", async (scenario: StandardScenario) => {
        const original = (await keyValue({
            key: scenario.keyValue.one.key,
        })) as KeyValue
        const result = await updateKeyValue({
            key: original.key,
            input: { key: "String2" },
        })

        expect(result.key).toEqual("String2")
    })

    scenario("deletes a keyValue", async (scenario: StandardScenario) => {
        const original = (await deleteKeyValue({
            key: scenario.keyValue.one.key,
        })) as KeyValue
        const result = await keyValue({ key: original.key })

        expect(result).toEqual(null)
    })
})
