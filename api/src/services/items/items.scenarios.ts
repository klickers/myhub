import type { Prisma, Item } from "@prisma/client"
import type { ScenarioData } from "@redwoodjs/testing/api"

export const standard = defineScenario<Prisma.ItemCreateArgs>({
    item: {
        one: {
            data: {
                type: "FOLDER",
                name: "String",
                slug: "String",
                status: { create: { status: "String4425357" } },
                user: {
                    create: {
                        clerkId: "String8606073",
                        email: "String2845116",
                    },
                },
            },
        },
        two: {
            data: {
                type: "FOLDER",
                name: "String",
                slug: "String",
                status: { create: { status: "String5446432" } },
                user: {
                    create: {
                        clerkId: "String6652467",
                        email: "String9355239",
                    },
                },
            },
        },
    },
})

export type StandardScenario = ScenarioData<Item, "item">
