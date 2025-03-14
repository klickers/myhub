import { Icon } from "@iconify/react/dist/iconify.js"
import type {
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables,
    Item,
} from "types/graphql"

import { Link } from "@redwoodjs/router"
import { routes } from "@redwoodjs/router"
import {
    type CellSuccessProps,
    type CellFailureProps,
    type TypedDocumentNode,
    Metadata,
} from "@redwoodjs/web"

import Breadcrumb from "../Breadcrumb/Breadcrumb"

export const QUERY: TypedDocumentNode<
    FindProjectHeaderQuery,
    FindProjectHeaderQueryVariables
> = gql`
    query FindProjectHeaderQuery($slug: String!) {
        project(slug: $slug) {
            name
            slug
            description
            parent {
                name
                slug
                type
                parent {
                    name
                    slug
                    type
                    parent {
                        name
                        slug
                        type
                    }
                }
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
            <p className="flex gap-1">
                {project.parent.parent && project.parent.parent.parent ? (
                    <Breadcrumb item={project.parent.parent.parent as Item} />
                ) : null}
                {project.parent.parent ? (
                    <Breadcrumb item={project.parent.parent as Item} />
                ) : null}
                <Breadcrumb item={project.parent as Item} />
            </p>
            <Link
                to={routes.workspaceUpdateProject({ slug: project.slug })}
                className="float-right"
            >
                <Icon icon="gravity-ui:pencil" />
            </Link>
            <h2>{project.name}</h2>
        </>
    )
}
