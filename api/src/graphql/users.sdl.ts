export const schema = gql`
    type User {
        clerkId: String!
        email: String!
        items: [Item]!
    }

    type Query {
        users: [User!]! @requireAuth
        user(clerkId: String!): User @requireAuth
    }

    input CreateUserInput {
        clerkId: String!
        email: String!
    }

    input UpdateUserInput {
        clerkId: String!
        email: String
    }

    type Mutation {
        createUser(input: CreateUserInput!): User! @requireAuth
        updateUser(clerkId: String!, input: UpdateUserInput!): User!
            @requireAuth
        deleteUser(clerkId: String!): User! @requireAuth
    }
`
