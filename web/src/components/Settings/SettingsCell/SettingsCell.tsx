import type { SettingsQuery, SettingsQueryVariables } from "types/graphql"

import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

export const QUERY: TypedDocumentNode<SettingsQuery, SettingsQueryVariables> =
    gql`
        query SettingsQuery {
            settings {
                id
                name
                value
            }
        }
    `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<SettingsQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    settings,
}: CellSuccessProps<SettingsQuery, SettingsQueryVariables>) => {
    return (
        <table>
            {settings.map((item) => (
                <tr key={item.name}>
                    <td className="pr-3">{item.name}</td>
                    <td>{item.value}</td>
                </tr>
            ))}
        </table>
    )
}
