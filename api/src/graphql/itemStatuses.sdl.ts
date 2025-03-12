export const schema = gql`
    type ItemStatus {
        id: Int!
        status: String!
        userId: String!
        user: User!
        items: [Item]!
    }

    type Query {
        itemStatuses: [ItemStatus!]! @requireAuth
        itemStatus(id: Int!): ItemStatus @requireAuth
    }

    input CreateItemStatusInput {
        status: String!
        userId: String!
    }

    input UpdateItemStatusInput {
        status: String
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
