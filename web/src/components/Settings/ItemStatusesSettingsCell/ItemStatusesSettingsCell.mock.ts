// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    itemStatusesSettings: [
        {
            __typename: "ItemStatusesSettings" as const,
            id: 42,
        },
        {
            __typename: "ItemStatusesSettings" as const,
            id: 43,
        },
        {
            __typename: "ItemStatusesSettings" as const,
            id: 44,
        },
    ],
})
