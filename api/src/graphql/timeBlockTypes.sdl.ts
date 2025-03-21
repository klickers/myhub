export const schema = gql`
    type TimeBlockType {
        id: Int!
        name: String!
        userId: String!
        user: User!
        timeBlocks: [TimeBlock]!
    }

    type Query {
        timeBlockTypes: [TimeBlockType!]! @requireAuth
        timeBlockType(id: Int!): TimeBlockType @requireAuth
    }

    input CreateTimeBlockTypeInput {
        name: String!
        userId: String
    }

    input UpdateTimeBlockTypeInput {
        name: String
        userId: String
    }

    type Mutation {
        createTimeBlockType(input: CreateTimeBlockTypeInput!): TimeBlockType!
            @requireAuth
        updateTimeBlockType(
            id: Int!
            input: UpdateTimeBlockTypeInput!
        ): TimeBlockType! @requireAuth
        deleteTimeBlockType(id: Int!): TimeBlockType! @requireAuth
    }
`
