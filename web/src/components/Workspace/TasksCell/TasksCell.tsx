import { useState } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import { format } from "date-fns"
import ContentEditable from "react-contenteditable"
import type {
    Item,
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
import { toast, useToaster } from "@redwoodjs/web/toast"

import CustomDatePicker from "src/components/CustomDatePicker/CustomDatePicker"

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
            minBlockTime
            maxBlockTime
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
    const [stateTasks, setStateTasks] = useState<Item[]>(tasks as Item[])
    const [inputChangeTimer, setInputChangeTimer] = useState(null)

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
        const propValue = propName.includes("Time")
            ? parseInt(e.target.value)
            : e
        setStateTasks(
            stateTasks.map((task) => {
                if (task.id == id) return { ...task, [propName]: propValue }
                return task
            })
        )
        clearTimeout(inputChangeTimer)
        setInputChangeTimer(
            setTimeout(() => {
                update({
                    variables: {
                        id,
                        input: {
                            [propName]: propValue,
                        },
                    },
                })
            }, 250)
        )
    }

    return (
        <>
            <h3>Tasks</h3>
            {stateTasks.length > 0 ? (
                <table className="tasks mb-6 w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="number">Est. Time</th>
                            <th className="number">Min Block</th>
                            <th className="number">Max Block</th>
                            <th className="number">Soft Due</th>
                            <th className="number">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateTasks.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b border-gray-200"
                            >
                                <td>
                                    <Icon icon="gravity-ui:circle" />
                                </td>
                                <td>
                                    <ContentEditable
                                        html={item.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                item.id,
                                                "name"
                                            )
                                        }
                                    />
                                </td>
                                <td className="number">
                                    {item.estimatedTime
                                        ? Math.round(
                                              (item.estimatedTime / 60) * 100
                                          ) / 100
                                        : 0}
                                </td>
                                <td className="number">
                                    <ContentEditable
                                        html={
                                            item.estimatedTime
                                                ? item.estimatedTime.toString()
                                                : ""
                                        }
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
                                    <ContentEditable
                                        html={
                                            item.minBlockTime
                                                ? item.minBlockTime.toString()
                                                : ""
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                item.id,
                                                "minBlockTime"
                                            )
                                        }
                                    />
                                </td>
                                <td className="number">
                                    <ContentEditable
                                        html={
                                            item.maxBlockTime
                                                ? item.maxBlockTime.toString()
                                                : ""
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                e,
                                                item.id,
                                                "maxBlockTime"
                                            )
                                        }
                                    />
                                </td>
                                <td className="number">
                                    <CustomDatePicker
                                        selectedDate={item.softDueDate}
                                        onChangeFunction={(e) =>
                                            handleInputChange(
                                                e,
                                                item.id,
                                                "softDueDate"
                                            )
                                        }
                                    />
                                </td>
                                <td className="number">
                                    <CustomDatePicker
                                        selectedDate={item.dueDate}
                                        onChangeFunction={(e) =>
                                            handleInputChange(
                                                e,
                                                item.id,
                                                "dueDate"
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
            <CreateTask
                parentId={parent.id}
                tasks={stateTasks}
                setTasks={setStateTasks}
            />
        </>
    )
}
