// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    projectHeader: {
        __typename: "ProjectHeader" as const,
        id: 42,
    },
})
