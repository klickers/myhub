// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    updateProject: {
        __typename: "UpdateQuest" as const,
        id: 42,
    },
})
