export const schema = gql`
    type GoogleCalendarLink {
        id: String!
        title: String
        calendarLink: String!
        classes: String
        userId: String!
        user: User!
    }

    type Query {
        googleCalendarLinks: [GoogleCalendarLink!]! @requireAuth
        googleCalendarLink(id: String!): GoogleCalendarLink @requireAuth
    }

    input CreateGoogleCalendarLinkInput {
        title: String
        calendarLink: String!
        classes: String
        userId: String
    }

    input UpdateGoogleCalendarLinkInput {
        title: String
        calendarLink: String
        classes: String
        userId: String
    }

    type Mutation {
        createGoogleCalendarLink(
            input: CreateGoogleCalendarLinkInput!
        ): GoogleCalendarLink! @requireAuth
        updateGoogleCalendarLink(
            id: String!
            input: UpdateGoogleCalendarLinkInput!
        ): GoogleCalendarLink! @requireAuth
        deleteGoogleCalendarLink(id: String!): GoogleCalendarLink! @requireAuth
    }
`
