export const schema = gql`
    type ItemStatus {
        id: Int!
        name: String!
        code: StatusCode!
        userId: String!
        user: User!
        items: [Item]!
    }

    enum StatusCode {
        OPEN
        IN_PROGRESS
        COMPLETED
        ARCHIVED
    }

    type Query {
        itemStatuses: [ItemStatus!]! @requireAuth
        itemStatus(id: Int!): ItemStatus @requireAuth
    }

    input CreateItemStatusInput {
        name: String!
        code: StatusCode!
        userId: String
    }

    input UpdateItemStatusInput {
        name: String
        code: StatusCode
        userId: String
    }

    type Mutation {
        createItemStatus(input: CreateItemStatusInput!): ItemStatus!
            @requireAuth
        updateItemStatus(id: Int!, input: UpdateItemStatusInput!): ItemStatus!
            @requireAuth
        deleteItemStatus(id: Int!): ItemStatus! @requireAuth
    }
`
