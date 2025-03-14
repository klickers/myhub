// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    folder: {
        __typename: "folder" as const,
        slug: "learning",
    },
})
