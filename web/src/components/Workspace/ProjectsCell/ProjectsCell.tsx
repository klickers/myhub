import { format } from "date-fns"
import type { ProjectsQuery, ProjectsQueryVariables } from "types/graphql"

import { Link } from "@redwoodjs/router"
import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

import CreateProject from "../CreateProject/CreateProject"

export const QUERY: TypedDocumentNode<ProjectsQuery, ProjectsQueryVariables> =
    gql`
        query ProjectsQuery($parentSlug: String!) {
            projects(parentSlug: $parentSlug) {
                id
                name
                slug
                description
                startDate
                dueDate
            }
            parent: item(slug: $parentSlug) {
                id
            }
        }
    `

export const Loading = () => <div>Loading projects...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<ProjectsQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    projects,
    parent,
    parentSlug,
}: CellSuccessProps<ProjectsQuery, ProjectsQueryVariables>) => {
    return (
        <>
            <div>
                {projects.length > 0 ? (
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {projects.map((item) => (
                            <Link
                                to="#!"
                                key={item.id}
                                className="project-card"
                            >
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                {item.startDate || item.dueDate ? (
                                    <p className="project-card__dates">
                                        {item.startDate
                                            ? format(
                                                  item.startDate,
                                                  "MMM dd, yyyy"
                                              )
                                            : "N/A"}{" "}
                                        -{" "}
                                        {item.dueDate
                                            ? format(
                                                  item.dueDate,
                                                  "MMM dd, yyyy"
                                              )
                                            : "N/A"}
                                    </p>
                                ) : null}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>Create a project!</p>
                )}
                <CreateProject
                    parentId={parent.id}
                    query={{
                        query: QUERY,
                        variables: { parentSlug },
                    }}
                />
            </div>
        </>
    )
}
