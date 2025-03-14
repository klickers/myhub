import type { FindFolderQuery, FindFolderQueryVariables } from "types/graphql"

import {
    type CellSuccessProps,
    type CellFailureProps,
    type TypedDocumentNode,
    Metadata,
} from "@redwoodjs/web"

export const QUERY: TypedDocumentNode<
    FindFolderQuery,
    FindFolderQueryVariables
> = gql`
    query FindFolderQuery($slug: String!) {
        folder(slug: $slug) {
            name
            description
        }
    }
`

export const Loading = () => <div>Loading folder...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<FindFolderQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    folder,
}: CellSuccessProps<FindFolderQuery, FindFolderQueryVariables>) => {
    return (
        <>
            <Metadata title={folder.name} description={folder.description} />
            <h2>{folder.name}</h2>
        </>
    )
}
