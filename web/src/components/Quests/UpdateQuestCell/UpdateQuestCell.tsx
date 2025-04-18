import { useState } from "react"

import slugify from "react-slugify"
import type {
    FindUpdateQuestQuery,
    FindUpdateQuestQueryVariables,
    UpdateQuestMutation,
    UpdateQuestMutationVariables,
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

import Breadcrumb from "../../Workspace/Breadcrumb/Breadcrumb"

interface FormValues {
    name: string
    slug: string
    description?: string
}

const UPDATE_QUEST = gql`
    mutation UpdateQuestMutation($id: String!, $input: UpdateItemInput!) {
        updateItem(id: $id, input: $input) {
            id
        }
    }
`

export const QUERY: TypedDocumentNode<
    FindUpdateQuestQuery,
    FindUpdateQuestQueryVariables
> = gql`
    query FindUpdateQuestQuery($id: String!) {
        item(id: $id) {
            __typename
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
}: CellFailureProps<FindUpdateQuestQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    item: quest,
}: CellSuccessProps<FindUpdateQuestQuery, FindUpdateQuestQueryVariables>) => {
    const [questName, setQuestName] = useState(quest.name)
    const [questSlug, setQuestSlug] = useState(quest.slug)
    const [questDescription, setQuestDescription] = useState(quest.description)
    const [startDate, setStartDate] = useState(quest.startDate)
    const [dueDate, setDueDate] = useState(quest.dueDate)

    const [update, { loading, error }] = useMutation<
        UpdateQuestMutation,
        UpdateQuestMutationVariables
    >(UPDATE_QUEST, {
        onCompleted: () => {
            toast.success("Quest updated!")
            // TODO: redirect to quest page
        },
        refetchQueries: [{ query: QUERY, variables: { slug: questSlug } }],
        awaitRefetchQueries: true,
    })

    // TODO: update based on change

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        update({
            variables: {
                id: quest.id,
                input: {
                    ...data,
                    //type: "QUEST" as ItemType,
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
                <Breadcrumb item={quest} />
            </p>
            <h2>Update Quest</h2>
            <Form onSubmit={onSubmit} error={error}>
                <div>
                    <Label name="name">Quest Name</Label>
                    <TextField
                        name="name"
                        value={questName}
                        onChange={(e) => setQuestName(e.target.value)}
                        validation={{ required: true }}
                    />
                </div>
                <div>
                    <Label name="slug">Quest Slug</Label>
                    <TextField
                        name="slug"
                        value={questSlug}
                        onChange={(e) => setQuestSlug(slugify(e.target.value))}
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
                        value={questDescription}
                        onChange={(e) => setQuestDescription(e.target.value)}
                        placeholder="What's the quest objective?"
                    />
                </div>
                <Submit disabled={loading}>Update Quest</Submit>
            </Form>
        </>
    )
}
