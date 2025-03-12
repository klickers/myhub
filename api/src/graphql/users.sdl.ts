export const schema = gql`
    type User {
        id: String!
        clerkId: String!
        email: String!
        items: [Item]!
    }

    type Query {
        users: [User!]! @requireAuth
        user(id: String!): User @requireAuth
    }

    input CreateUserInput {
        clerkId: String!
        email: String!
    }

    input UpdateUserInput {
        clerkId: String
        email: String
    }

    type Mutation {
        createUser(input: CreateUserInput!): User! @skipAuth
        updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    }
`
