import { Icon } from "@iconify/react/dist/iconify.js"
import { format } from "date-fns"
import ContentEditable from "react-contenteditable"
import type {
    TasksQuery,
    TasksQueryVariables,
    UpdateTaskMutation,
    UpdateTaskMutationVariables,
} from "types/graphql"

import {
    type CellSuccessProps,
    type CellFailureProps,
    type TypedDocumentNode,
    useMutation,
} from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import CreateTask from "../CreateTask/CreateTask"

const UPDATE_TASK = gql`
    mutation UpdateTaskMutation($id: String!, $input: UpdateItemInput!) {
        updateItem(id: $id, input: $input) {
            id
        }
    }
`

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
    const [update, { loading, error }] = useMutation<
        UpdateTaskMutation,
        UpdateTaskMutationVariables
    >(UPDATE_TASK, {
        onCompleted: () => {
            toast.success("Value updated!")
        },
        refetchQueries: [{ query: QUERY, variables: { parentSlug } }],
        awaitRefetchQueries: true,
    })

    const handleInputChange = (e, id: string, propName: string) => {
        const propValue =
            propName == "estimatedTime"
                ? parseInt(e.target.value)
                : e.target.value
        update({
            variables: {
                id,
                input: {
                    [propName]: propValue,
                },
            },
        })
    }

    return (
        <>
            <h3>Tasks</h3>
            <table className="tasks mb-6 w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th className="number">Est. Time</th>
                        <th className="number">Soft Due</th>
                        <th className="number">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                            <td>
                                <Icon icon="gravity-ui:circle" />
                            </td>
                            <td>{item.name}</td>
                            <td className="number">
                                {item.estimatedTime / 60}
                            </td>
                            <td className="number">
                                <ContentEditable
                                    html={item.estimatedTime.toString()}
                                    onChange={(e) =>
                                        handleInputChange(
                                            e,
                                            item.id,
                                            "estimatedTime"
                                        )
                                    }
                                />
                            </td>
                            <td className="number">
                                {item.softDueDate
                                    ? format(item.softDueDate, "MM/dd")
                                    : null}
                            </td>
                            <td className="number">
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
