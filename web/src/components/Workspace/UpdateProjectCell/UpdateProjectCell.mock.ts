// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    updateProject: {
        __typename: "UpdateProject" as const,
        id: 42,
    },
})
