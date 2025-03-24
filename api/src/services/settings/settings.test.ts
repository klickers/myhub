import type { Setting } from "@prisma/client"

import {
    settings,
    setting,
    createSetting,
    updateSetting,
    deleteSetting,
} from "./settings"
import type { StandardScenario } from "./settings.scenarios"

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("settings", () => {
    scenario("returns all settings", async (scenario: StandardScenario) => {
        const result = await settings()

        expect(result.length).toEqual(Object.keys(scenario.setting).length)
    })

    scenario("returns a single setting", async (scenario: StandardScenario) => {
        const result = await setting({ id: scenario.setting.one.id })

        expect(result).toEqual(scenario.setting.one)
    })

    scenario("creates a setting", async (scenario: StandardScenario) => {
        const result = await createSetting({
            input: {
                name: "String",
                value: "String",
                userId: scenario.setting.two.userId,
            },
        })

        expect(result.name).toEqual("String")
        expect(result.value).toEqual("String")
        expect(result.userId).toEqual(scenario.setting.two.userId)
    })

    scenario("updates a setting", async (scenario: StandardScenario) => {
        const original = (await setting({
            id: scenario.setting.one.id,
        })) as Setting
        const result = await updateSetting({
            id: original.id,
            input: { name: "String2" },
        })

        expect(result.name).toEqual("String2")
    })

    scenario("deletes a setting", async (scenario: StandardScenario) => {
        const original = (await deleteSetting({
            id: scenario.setting.one.id,
        })) as Setting
        const result = await setting({ id: original.id })

        expect(result).toEqual(null)
    })
})
