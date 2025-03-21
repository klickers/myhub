import { Icon } from "@iconify/react/dist/iconify.js"
import { format } from "date-fns"
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
            <table className="tasks mb-6 w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Est. Time</th>
                        <th>Soft Due</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                            <td>
                                <Icon icon="gravity-ui:circle" />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.estimatedTime}</td>
                            <td>
                                {item.softDueDate
                                    ? format(item.softDueDate, "MM/dd")
                                    : null}
                            </td>
                            <td>
                                {item.dueDate
                                    ? format(item.dueDate, "MM/dd")
                                    : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreateTask
                parentId={parent.id}
                query={{ query: QUERY, variables: { parentSlug } }}
            />
        </>
    )
}
