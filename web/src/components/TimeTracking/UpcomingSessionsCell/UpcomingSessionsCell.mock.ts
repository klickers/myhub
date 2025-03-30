// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    upcomingSessions: [
        {
            __typename: "UpcomingSessions" as const,
            id: 42,
        },
        {
            __typename: "UpcomingSessions" as const,
            id: 43,
        },
        {
            __typename: "UpcomingSessions" as const,
            id: 44,
        },
    ],
})
