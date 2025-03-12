// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    folders: [
        {
            __typename: "folders" as const,
            id: 42,
        },
        {
            __typename: "folders" as const,
            id: 43,
        },
        {
            __typename: "folders" as const,
            id: 44,
        },
    ],
})
