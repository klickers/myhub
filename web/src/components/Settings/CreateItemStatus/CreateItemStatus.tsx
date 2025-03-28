import { useRef } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import {
    CreateItemStatusMutation,
    CreateItemStatusMutationVariables,
} from "types/graphql"

import {
    Form,
    Label,
    SelectField,
    Submit,
    SubmitHandler,
    TextField,
    useForm,
} from "@redwoodjs/forms"
import { useMutation } from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import CustomModal from "src/components/CustomModal/CustomModal"

interface Props {
    query: InternalRefetchQueryDescriptor
}

interface FormValues {
    name: string
}

const CREATE_ITEM_STATUS = gql`
    mutation CreateItemStatusMutation($input: CreateItemStatusInput!) {
        createItemStatus(input: $input) {
            id
        }
    }
`

const CreateItemStatus = ({ query }: Props) => {
    const modalRef = useRef()

    const formMethods = useForm()
    const [create, { loading, error }] = useMutation<
        CreateItemStatusMutation,
        CreateItemStatusMutationVariables
    >(CREATE_ITEM_STATUS, {
        onCompleted: () => {
            toast.success("Custom status created!")
            formMethods.reset()
        },
        refetchQueries: [query],
        awaitRefetchQueries: true,
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        create({
            variables: {
                input: {
                    ...data,
                },
            },
        })
        modalRef.current.closeModal()
    }

    return (
        <>
            <button onClick={() => modalRef.current.openModal()}>
                <Icon icon="gravity-ui:circle-plus" /> Add Status
            </button>
            <CustomModal ref={modalRef}>
                <h2>Create Item Status</h2>
                <Form
                    onSubmit={onSubmit}
                    error={error}
                    formMethods={formMethods}
                >
                    <div>
                        <Label name="name">Name</Label>
                        <TextField
                            name="name"
                            validation={{ required: true }}
                        />
                    </div>
                    <div>
                        <Label name="code">Status Code</Label>
                        <SelectField name="code">
                            <option value="OPEN">OPEN</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                        </SelectField>
                    </div>
                    <Submit disabled={loading}>Create Status</Submit>
                </Form>
            </CustomModal>
        </>
    )
}

export default CreateItemStatus
