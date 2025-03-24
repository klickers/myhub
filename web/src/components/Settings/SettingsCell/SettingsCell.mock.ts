// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    settings: [
        {
            __typename: "Setting" as const,
            id: "42",
        },
        {
            __typename: "Setting" as const,
            id: "43",
        },
        {
            __typename: "Setting" as const,
            id: "44",
        },
    ],
})
