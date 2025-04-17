import { useRef, useState } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import slugify from "react-slugify"
import {
    CreateProjectMutation,
    CreateProjectMutationVariables,
    ItemType,
} from "types/graphql"

import {
    Form,
    Label,
    Submit,
    SubmitHandler,
    TextAreaField,
    TextField,
    useForm,
} from "@redwoodjs/forms"
import { useMutation } from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import CustomDatePicker from "src/components/CustomDatePicker/CustomDatePicker"
import CustomModal from "src/components/CustomModal/CustomModal"

interface Props {
    parentId: string
    query: InternalRefetchQueryDescriptor
}

interface FormValues {
    name: string
    slug: string
    description?: string
}

const CREATE_QUEST = gql`
    mutation CreateProjectMutation($input: CreateItemInput!) {
        createItem(input: $input) {
            id
        }
    }
`

const CreateProject = ({ parentId, query }: Props) => {
    const modalRef = useRef()

    const [newProjectSlug, setNewProjectSlug] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [dueDate, setDueDate] = useState(null)

    const formMethods = useForm()
    const [create, { loading, error }] = useMutation<
        CreateProjectMutation,
        CreateProjectMutationVariables
    >(CREATE_QUEST, {
        onCompleted: () => {
            toast.success("Project created!")
            formMethods.reset()
            setStartDate(null)
            setDueDate(null)
            setNewProjectSlug("")
        },
        refetchQueries: [query],
        awaitRefetchQueries: true,
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        create({
            variables: {
                input: {
                    ...data,
                    type: "QUEST" as ItemType,
                    startDate,
                    dueDate,
                    parentId,
                },
            },
        })
        modalRef.current.closeModal()
    }

    return (
        <>
            <button onClick={() => modalRef.current.openModal()}>
                <Icon icon="gravity-ui:circle-plus" /> Add Project
            </button>
            <CustomModal ref={modalRef}>
                <h2>Create Project</h2>
                <Form
                    onSubmit={onSubmit}
                    error={error}
                    formMethods={formMethods}
                >
                    <div>
                        <Label name="name">Project Name</Label>
                        <TextField
                            name="name"
                            onChange={(e) =>
                                setNewProjectSlug(slugify(e.target.value))
                            }
                            validation={{ required: true }}
                        />
                    </div>
                    <div>
                        <Label name="slug">Project Slug</Label>
                        <TextField
                            name="slug"
                            value={newProjectSlug}
                            onChange={(e) =>
                                setNewProjectSlug(slugify(e.target.value))
                            }
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
                            <p>Due Date</p>
                            <CustomDatePicker
                                selectedDate={dueDate}
                                onChangeFunction={setDueDate}
                            />
                        </div>
                    </div>
                    <div>
                        <Label name="description" />
                        <TextAreaField
                            name="description"
                            placeholder="What's the project objective?"
                        />
                    </div>
                    <Submit disabled={loading}>Create Project</Submit>
                </Form>
            </CustomModal>
        </>
    )
}

export default CreateProject
