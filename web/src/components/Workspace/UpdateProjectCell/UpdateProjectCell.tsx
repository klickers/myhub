import { useState } from "react"

import slugify from "react-slugify"
import type {
    FindUpdateProjectQuery,
    FindUpdateProjectQueryVariables,
    UpdateProjectMutation,
    UpdateProjectMutationVariables,
} from "types/graphql"

import {
    Form,
    Label,
    Submit,
    SubmitHandler,
    TextAreaField,
    TextField,
} from "@redwoodjs/forms"
import {
    type CellSuccessProps,
    type CellFailureProps,
    type TypedDocumentNode,
    useMutation,
} from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import CustomDatePicker from "src/components/CustomDatePicker/CustomDatePicker"

import Breadcrumb from "../Breadcrumb/Breadcrumb"

interface FormValues {
    name: string
    slug: string
    description?: string
}

const UPDATE_PROJECT = gql`
    mutation UpdateProjectMutation($id: String!, $input: UpdateItemInput!) {
        updateItem(id: $id, input: $input) {
            id
        }
    }
`

export const QUERY: TypedDocumentNode<
    FindUpdateProjectQuery,
    FindUpdateProjectQueryVariables
> = gql`
    query FindUpdateProjectQuery($slug: String!) {
        project(slug: $slug) {
            id
            name
            slug
            description
            startDate
            dueDate
        }
    }
`

export const Loading = () => <div>Loading form...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<FindUpdateProjectQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    project,
}: CellSuccessProps<
    FindUpdateProjectQuery,
    FindUpdateProjectQueryVariables
>) => {
    const [projectName, setProjectName] = useState(project.name)
    const [projectSlug, setProjectSlug] = useState(project.slug)
    const [projectDescription, setProjectDescription] = useState(
        project.description
    )
    const [startDate, setStartDate] = useState(project.startDate)
    const [dueDate, setDueDate] = useState(project.dueDate)

    const [update, { loading, error }] = useMutation<
        UpdateProjectMutation,
        UpdateProjectMutationVariables
    >(UPDATE_PROJECT, {
        onCompleted: () => {
            toast.success("Project updated!")
            // redirect to project page
        },
        refetchQueries: [{ query: QUERY }],
        awaitRefetchQueries: true,
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        update({
            variables: {
                id: project.id,
                input: {
                    ...data,
                    //type: "PROJECT" as ItemType,
                    startDate,
                    dueDate,
                    //parentId,
                },
            },
        })
    }

    return (
        <>
            <p>
                <Breadcrumb item={project} />
            </p>
            <h2>Update Project</h2>
            <Form onSubmit={onSubmit} error={error}>
                <div>
                    <Label name="name">Project Name</Label>
                    <TextField
                        name="name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        validation={{ required: true }}
                    />
                </div>
                <div>
                    <Label name="slug">Project Slug</Label>
                    <TextField
                        name="slug"
                        value={projectSlug}
                        onChange={(e) =>
                            setProjectSlug(slugify(e.target.value))
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
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="What's the project objective?"
                    />
                </div>
                <Submit disabled={loading}>Update Project</Submit>
            </Form>
        </>
    )
}
