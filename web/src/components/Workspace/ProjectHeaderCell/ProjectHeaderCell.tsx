import type {
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables,
    ItemType,
} from "types/graphql"

import { Link } from "@redwoodjs/router"
import { routes } from "@redwoodjs/router"
import {
    type CellSuccessProps,
    type CellFailureProps,
    type TypedDocumentNode,
    Metadata,
} from "@redwoodjs/web"

export const QUERY: TypedDocumentNode<
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables
> = gql`
    query FindProjectHeaderQuery($slug: String!) {
        project(slug: $slug) {
            name
            description
            parent {
                name
                slug
                type
            }
        }
    }
`

export const Loading = () => <div>Loading project header...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<FindProjectHeaderQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    project,
}: CellSuccessProps<
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables
>) => {
    return (
        <>
            <Metadata title={project.name} description={project.description} />
            <p className="text-xs uppercase font-medium">
                <Link
                    to={
                        project.parent.type == ("FOLDER" as ItemType)
                            ? routes.workspaceFolder({
                                  slug: project.parent.slug,
                              })
                            : routes.workspaceProject({
                                  slug: project.parent.slug,
                              })
                    }
                    className="no-underline"
                >
                    {project.parent.name} &nbsp;&gt;
                </Link>
            </p>
            <h2>{project.name}</h2>
        </>
    )
}
