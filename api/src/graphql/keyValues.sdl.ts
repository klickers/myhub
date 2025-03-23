export const schema = gql`
    type KeyValue {
        key: String!
        value: String!
        userId: String!
        user: User!
    }

    type Query {
        keyValues: [KeyValue!]! @requireAuth
        keyValue(key: String!): KeyValue @requireAuth
    }

    input CreateKeyValueInput {
        key: String!
        value: String!
        userId: String
    }

    input UpdateKeyValueInput {
        key: String!
        value: String
        userId: String
    }

    type Mutation {
        createKeyValue(input: CreateKeyValueInput!): KeyValue! @requireAuth
        updateKeyValue(key: String!, input: UpdateKeyValueInput!): KeyValue!
            @requireAuth
        deleteKeyValue(key: String!): KeyValue! @requireAuth
    }
`
