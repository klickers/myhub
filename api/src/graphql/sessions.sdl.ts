export const schema = gql`
    type Session {
        id: Int!
        type: SessionType!
        start: DateTime!
        end: DateTime!
        notes: String
        userId: String!
        itemId: String
        user: User!
        item: Item
    }

    enum SessionType {
        PLANNED
        TRACKED
    }

    type Query {
        sessions(
            start: DateTime!
            end: DateTime!
            type: SessionType
        ): [Session!]! @requireAuth
        session(id: Int!): Session @requireAuth
    }

    input CreateSessionInput {
        type: SessionType!
        start: DateTime!
        end: DateTime!
        notes: String
        userId: String
        itemId: String
    }

    input UpdateSessionInput {
        type: SessionType
        start: DateTime
        end: DateTime
        notes: String
        userId: String
        itemId: String
    }

    type Mutation {
        createSession(input: CreateSessionInput!): Session! @requireAuth
        updateSession(id: Int!, input: UpdateSessionInput!): Session!
            @requireAuth
        deleteSession(id: Int!): Session! @requireAuth

        createSessions(input: [CreateSessionInput!]!): [Session!]! @requireAuth
        deleteSessions(ids: [Int!]!): [Int!]! @requireAuth
    }
`
