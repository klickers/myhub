// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    googleCalendarLinks: [
        {
            __typename: "GoogleCalendarLink" as const,
            id: "42",
        },
        {
            __typename: "GoogleCalendarLink" as const,
            id: "43",
        },
        {
            __typename: "GoogleCalendarLink" as const,
            id: "44",
        },
    ],
})
