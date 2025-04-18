import type { QuestsQuery, QuestsQueryVariables } from "types/graphql"

import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

export const QUERY: TypedDocumentNode<QuestsQuery, QuestsQueryVariables> = gql`
    query QuestsQuery {
        quests {
            __typename
            id
            name
            parents {
                __typename
                id
                type
            }
        }
    }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<QuestsQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    quests,
}: CellSuccessProps<QuestsQuery, QuestsQueryVariables>) => {
    return (
        <div className="mb-6 rounded-3xl border border-black p-6">
            {quests.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    )
}
