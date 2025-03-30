import { differenceInMinutes, format } from "date-fns"
import type {
    Item,
    UpcomingSessionsQuery,
    UpcomingSessionsQueryVariables,
} from "types/graphql"

import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

import Breadcrumb from "src/components/Workspace/Breadcrumb/Breadcrumb"

export const QUERY: TypedDocumentNode<
    UpcomingSessionsQuery,
    UpcomingSessionsQueryVariables
> = gql`
    query UpcomingSessionsQuery($start: DateTime!, $end: DateTime!) {
        sessions(start: $start, end: $end, type: PLANNED) {
            id
            __typename
            start
            end
            item {
                name
                slug
                parent {
                    name
                    slug
                }
            }
        }
    }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<UpcomingSessionsQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    sessions,
}: CellSuccessProps<UpcomingSessionsQuery, UpcomingSessionsQueryVariables>) => {
    return (
        <div>
            {sessions.map((session) => (
                <div key={session.id} className="flex gap-4">
                    <p className="text-xs">
                        <span className="font-semibold">
                            {format(session.start, "KK:mm b")}
                        </span>
                        <br />
                        <span>
                            {differenceInMinutes(session.end, session.start)}{" "}
                            min
                        </span>
                    </p>
                    <div>
                        <div className="text-gray-700">
                            <Breadcrumb item={session.item.parent as Item} />
                        </div>
                        <p>{session.item?.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
