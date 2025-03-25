import { useRef, useState } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import { getUnixTime } from "date-fns"
import slugify from "react-slugify"
import {
    CreateTaskMutation,
    CreateTaskMutationVariables,
    Item,
    ItemType,
} from "types/graphql"

import {
    Form,
    Label,
    NumberField,
    Submit,
    SubmitHandler,
    TextField,
    useForm,
} from "@redwoodjs/forms"
import { useMutation } from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import CustomDatePicker from "src/components/CustomDatePicker/CustomDatePicker"
import CustomModal from "src/components/CustomModal/CustomModal"

interface Props {
    parentId: string
    tasks: Item[]
    setTasks: React.Dispatch<React.SetStateAction<Item[]>>
}

interface FormValues {
    name: string
    //slug: string
}

const CREATE_PROJECT = gql`
    mutation CreateTaskMutation($input: CreateItemInput!) {
        createItem(input: $input) {
            id
        }
    }
`

const CreateTask = ({ parentId, tasks, setTasks }: Props) => {
    const modalRef = useRef()

    const [startDate, setStartDate] = useState(null)
    const [softDueDate, setSoftDueDate] = useState(null)
    const [dueDate, setDueDate] = useState(null)

    const formMethods = useForm()
    const [create, { loading, error }] = useMutation<
        CreateTaskMutation,
        CreateTaskMutationVariables
    >(CREATE_PROJECT, {
        onCompleted: () => {
            toast.success("Task created!")
            formMethods.reset()
            setStartDate(null)
            setDueDate(null)
            setSoftDueDate(null)
        },
    })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const res = await create({
            variables: {
                input: {
                    ...data,
                    slug: slugify(getUnixTime(new Date())),
                    type: "TASK" as ItemType,
                    parentId,
                    startDate,
                    softDueDate,
                    dueDate,
                },
            },
        })
        setTasks([
            ...tasks,
            {
                id: res.data.createItem.id,
                ...data,
                softDueDate,
                dueDate,
                sessions: [],
            } as Item,
        ])
        modalRef.current.closeModal()
    }

    return (
        <>
            <button onClick={() => modalRef.current.openModal()}>
                <Icon icon="gravity-ui:circle-plus" /> Add Task
            </button>
            <CustomModal ref={modalRef}>
                <h2>Create Task</h2>
                <Form
                    onSubmit={onSubmit}
                    error={error}
                    formMethods={formMethods}
                >
                    <div>
                        <Label name="name">Task Name</Label>
                        <TextField
                            name="name"
                            validation={{ required: true }}
                        />
                    </div>
                    <div className="form-flexgroup">
                        <div>
                            <p>Start Date</p>
                            <CustomDatePicker
                                selectedDate={startDate}
                                onChangeFunction={setStartDate}
                            />
                        </div>
                        <div>
                            <p>Soft Due Date</p>
                            <CustomDatePicker
                                selectedDate={softDueDate}
                                onChangeFunction={setSoftDueDate}
                            />
                        </div>
                        <div>
                            <p>Hard Due Date</p>
                            <CustomDatePicker
                                selectedDate={dueDate}
                                onChangeFunction={setDueDate}
                            />
                        </div>
                    </div>
                    <div className="form-flexgroup">
                        <div>
                            <p>Estimated Time</p>
                            <NumberField name="estimatedTime" min="0" />
                        </div>
                        <div>
                            <p>Min. Block Time</p>
                            <NumberField name="minBlockTime" min="0" />
                        </div>
                        <div>
                            <p>Max. Block Time</p>
                            <NumberField name="maxBlockTime" min="0" />
                        </div>
                        <div>
                            <p>Max. Block Time Per Day</p>
                            <NumberField name="maxBlockTimePerDay" min="0" />
                        </div>
                    </div>
                    <div className="-mt-2">
                        <em className="pl-3 text-xs">
                            Please list times in minutes.
                        </em>
                    </div>
                    <Submit disabled={loading}>Create Task</Submit>
                </Form>
            </CustomModal>
        </>
    )
}

export default CreateTask
