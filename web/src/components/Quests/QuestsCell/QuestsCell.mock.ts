// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    quests: [
        {
            __typename: "quests" as const,
            id: 42,
        },
        {
            __typename: "quests" as const,
            id: 43,
        },
        {
            __typename: "quests" as const,
            id: 44,
        },
    ],
})
