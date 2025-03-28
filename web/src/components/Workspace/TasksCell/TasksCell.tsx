import { useEffect, useState } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import { differenceInMinutes } from "date-fns"
import ContentEditable from "react-contenteditable"
import type {
    Item,
    StatusCode,
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
    useQuery,
} from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import CustomDatePicker from "src/components/CustomDatePicker/CustomDatePicker"

import CreateTask from "../CreateTask/CreateTask"

const QUERY_ITEM_STATUSES = gql`
    query ItemStatusesQuery {
        itemStatuses {
            id
            name
            code
        }
    }
`

const UPDATE_TASK = gql`
    mutation UpdateTaskMutation($id: String!, $input: UpdateItemInput!) {
        updateItem(id: $id, input: $input) {
            id
        }
    }
`

export const QUERY: TypedDocumentNode<TasksQuery, TasksQueryVariables> = gql`
    query TasksQuery(
        $parentSlug: String!
        $statusCodes: [StatusCode] = [OPEN, IN_PROGRESS]
    ) {
        tasks(parentSlug: $parentSlug, statusCodes: $statusCodes) {
            id
            name
            estimatedTime
            minBlockTime
            maxBlockTime
            softDueDate
            dueDate
            status {
                code
            }
            sessions {
                start
                end
                type
            }
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

    const [itemStatuses, setItemStatuses] = useState([])
    const queryItemStatuses = useQuery(QUERY_ITEM_STATUSES)

    useEffect(() => {
        if (queryItemStatuses.data)
            setItemStatuses(queryItemStatuses.data.itemStatuses)
    }, [queryItemStatuses])

    const [update, { loading, error }] = useMutation<
        UpdateTaskMutation,
        UpdateTaskMutationVariables
    >(UPDATE_TASK, {
        onCompleted: () => {
            toast.success("Task updated!")
        },
        refetchQueries: [{ query: QUERY, variables: { parentSlug } }],
        awaitRefetchQueries: true,
    })

    const handleInputChange = (e, id: string, propName: string) => {
        const propValue = propName.includes("Time")
            ? parseInt(e.target.value)
            : propName.includes("Date")
              ? e
              : e.target.value
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

    const handleStatusChange = (
        id: string,
        statusId: number,
        statusCode: StatusCode
    ) => {
        if (statusCode != "OPEN" && statusCode != "IN_PROGRESS")
            setStateTasks(stateTasks.filter((task) => task.id != id))
        else
            setStateTasks(
                stateTasks.map((task) => {
                    if (task.id == id)
                        return { ...task, status: { code: statusCode } }
                    return task
                })
            )
        update({
            variables: {
                id,
                input: {
                    statusId,
                },
            },
        })
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
                            <th>Planned</th>
                            <th className="number">Est. Time</th>
                            <th className="number">Min Block</th>
                            <th className="number">Max Block</th>
                            <th className="number">Soft Due</th>
                            <th className="number">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateTasks.map((item) => {
                            const timePlanned =
                                item.sessions.length > 0
                                    ? item.sessions.reduce(
                                          (acc, val) =>
                                              acc +
                                              differenceInMinutes(
                                                  val.end,
                                                  val.start
                                              ),
                                          0
                                      )
                                    : 0
                            const percentPlanned = item.estimatedTime
                                ? Math.round(
                                      (timePlanned / item.estimatedTime) * 100
                                  )
                                : 0

                            let percentColor = "text-black"
                            if (percentPlanned == 100)
                                percentColor = "text-green-700"
                            else if (percentPlanned < 100) {
                                if (percentPlanned > 50)
                                    percentColor = "text-yellow-700"
                                else if (percentPlanned > 0)
                                    percentColor = "text-amber-700"
                                else percentColor = "text-red-700"
                            }

                            return (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-200 relative"
                                >
                                    <td className="task__status-dropdown-wrapper">
                                        <div>
                                            {item.status ? (
                                                item.status.code ==
                                                "IN_PROGRESS" ? (
                                                    <Icon icon="gravity-ui:circle-dashed" />
                                                ) : (
                                                    <Icon icon="gravity-ui:circle" />
                                                )
                                            ) : (
                                                <Icon icon="gravity-ui:circle" />
                                            )}
                                        </div>
                                        <div className="task__status-dropdown">
                                            {itemStatuses.map((status) => (
                                                <button
                                                    key={status.id}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            item.id,
                                                            status.id,
                                                            status.code
                                                        )
                                                    }
                                                    className={`button--plain ${(item.status && item.status.code == status.code) || (!item.status && status.code == "OPEN") ? "underline" : ""}`}
                                                >
                                                    {status.name}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="min-w-64">
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
                                    <td className={`number ${percentColor}`}>
                                        {percentPlanned}%
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
                            )
                        })}
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
