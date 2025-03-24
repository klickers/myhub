import type {
    GoogleCalendarLinksQuery,
    GoogleCalendarLinksQueryVariables,
} from "types/graphql"

import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

import CreateGoogleCalendarLink from "../CreateGoogleCalendarLink/CreateGoogleCalendarLink"

export const QUERY: TypedDocumentNode<
    GoogleCalendarLinksQuery,
    GoogleCalendarLinksQueryVariables
> = gql`
    query GoogleCalendarLinksTableQuery {
        googleCalendarLinks {
            title
            calendarLink
            classes
        }
    }
`

export const Loading = () => (
    <>
        <h2>Google Calendar Links</h2>
        <p>Loading...</p>
    </>
)

export const Empty = () => (
    <>
        <h2>Google Calendar Links</h2>
        <CreateGoogleCalendarLink query={{ query: QUERY }} />
    </>
)

export const Failure = ({
    error,
}: CellFailureProps<GoogleCalendarLinksQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    googleCalendarLinks,
}: CellSuccessProps<
    GoogleCalendarLinksQuery,
    GoogleCalendarLinksQueryVariables
>) => {
    return (
        <>
            <h2>Google Calendar Links</h2>
            <div className="mb-6">
                <table>
                    {googleCalendarLinks.map((item) => (
                        <tr key={item.calendarLink}>
                            <td className="pr-3">{item.title}</td>
                            <td className="pr-3">{item.calendarLink}</td>
                            <td className="pr-3">{item.classes}</td>
                        </tr>
                    ))}
                </table>
            </div>
            <CreateGoogleCalendarLink query={{ query: QUERY }} />
        </>
    )
}
