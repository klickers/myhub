import { Icon } from "@iconify/react/dist/iconify.js"
import type { TasksQuery, TasksQueryVariables } from "types/graphql"

import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

import CreateTask from "../CreateTask/CreateTask"

export const QUERY: TypedDocumentNode<TasksQuery, TasksQueryVariables> = gql`
    query TasksQuery($parentSlug: String!) {
        tasks(parentSlug: $parentSlug) {
            id
            name
            estimatedTime
            softDueDate
            dueDate
        }
        parent: item(slug: $parentSlug) {
            id
        }
    }
`

export const Loading = () => <div>Loading tasks...</div>

export const Empty = () => (
    <>
        <h3>Tasks</h3>
        <p>No tasks :(</p>
    </>
)

export const Failure = ({ error }: CellFailureProps<TasksQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    tasks,
    parent,
    parentSlug,
}: CellSuccessProps<TasksQuery, TasksQueryVariables>) => {
    return (
        <>
            <h3>Tasks</h3>
            <ul className="mb-6">
                {tasks.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-2 mb-3 pb-1 border-b border-gray-200"
                    >
                        <Icon icon="gravity-ui:circle" />
                        <p className="mb-0">{item.name}</p>
                    </div>
                ))}
            </ul>
            <CreateTask
                parentId={parent.id}
                query={{ query: QUERY, variables: { parentSlug } }}
            />
        </>
    )
}
