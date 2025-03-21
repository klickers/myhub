export const schema = gql`
    type TimeBlock {
        id: Int!
        start: DateTime!
        end: DateTime!
        typeId: Int!
        notes: String
        userId: String!
        type: TimeBlockType!
        user: User!
    }

    type Query {
        timeBlocks(start: DateTime!, end: DateTime!): [TimeBlock!]! @requireAuth
        timeBlock(id: Int!): TimeBlock @requireAuth
    }

    input CreateTimeBlockInput {
        start: DateTime!
        end: DateTime!
        typeId: Int!
        notes: String
        userId: String
    }

    input UpdateTimeBlockInput {
        start: DateTime
        end: DateTime
        typeId: Int
        notes: String
        userId: String
    }

    type Mutation {
        createTimeBlock(input: CreateTimeBlockInput!): TimeBlock! @requireAuth
        updateTimeBlock(id: Int!, input: UpdateTimeBlockInput!): TimeBlock!
            @requireAuth
        deleteTimeBlock(id: Int!): TimeBlock! @requireAuth
    }
`
