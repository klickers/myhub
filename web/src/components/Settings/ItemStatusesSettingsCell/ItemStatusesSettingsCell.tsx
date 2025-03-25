import type {
    ItemStatusesSettingsQuery,
    ItemStatusesSettingsQueryVariables,
} from "types/graphql"

import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

import CreateItemStatus from "../CreateItemStatus/CreateItemStatus"

export const QUERY: TypedDocumentNode<
    ItemStatusesSettingsQuery,
    ItemStatusesSettingsQueryVariables
> = gql`
    query ItemStatusesSettingsQuery {
        itemStatuses {
            name
            code
        }
    }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
    <div>
        <p>Empty</p>
        <CreateItemStatus query={{ query: QUERY }} />
    </div>
)

export const Failure = ({
    error,
}: CellFailureProps<ItemStatusesSettingsQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    itemStatuses,
}: CellSuccessProps<
    ItemStatusesSettingsQuery,
    ItemStatusesSettingsQueryVariables
>) => {
    return (
        <div>
            <table className="mb-6">
                {itemStatuses.map((item) => (
                    <tr key={item.name}>
                        <td className="pr-3">{item.code}</td>
                        <td>{item.name}</td>
                    </tr>
                ))}
            </table>
            <CreateItemStatus query={{ query: QUERY }} />
        </div>
    )
}
