export const schema = gql`
    type Setting {
        id: String!
        name: String!
        value: String!
        userId: String!
        user: User!
    }

    type Query {
        settings: [Setting!]! @requireAuth
        setting(id: String!): Setting @requireAuth
    }

    input CreateSettingInput {
        name: String!
        value: String!
        userId: String
    }

    input UpdateSettingInput {
        name: String
        value: String
        userId: String
    }

    type Mutation {
        createSetting(input: CreateSettingInput!): Setting! @requireAuth
        updateSetting(id: String!, input: UpdateSettingInput!): Setting!
            @requireAuth
        deleteSetting(id: String!): Setting! @requireAuth
    }
`
