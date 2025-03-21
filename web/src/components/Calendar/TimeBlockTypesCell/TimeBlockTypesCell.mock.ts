// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    timeBlockTypes: [
        {
            __typename: "TimeBlockType" as const,
            id: 42,
        },
        {
            __typename: "TimeBlockType" as const,
            id: 43,
        },
        {
            __typename: "TimeBlockType" as const,
            id: 44,
        },
    ],
})
