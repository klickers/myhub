import { useRef } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import {
    CreateTimeBlockTypeMutation,
    CreateTimeBlockTypeMutationVariables,
} from "types/graphql"

import {
    Form,
    Label,
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

const CREATE_TIME_BLOCK_TYPE = gql`
    mutation CreateTimeBlockTypeMutation($input: CreateTimeBlockTypeInput!) {
        createTimeBlockType(input: $input) {
            id
        }
    }
`

const CreateTimeBlockType = ({ query }: Props) => {
    const modalRef = useRef()

    const formMethods = useForm()
    const [create, { loading, error }] = useMutation<
        CreateTimeBlockTypeMutation,
        CreateTimeBlockTypeMutationVariables
    >(CREATE_TIME_BLOCK_TYPE, {
        onCompleted: () => {
            toast.success("Time block type created!")
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
                <Icon icon="gravity-ui:circle-plus" /> Add Time Block Type
            </button>
            <CustomModal ref={modalRef}>
                <h2>Create Time Block Type</h2>
                <Form
                    onSubmit={onSubmit}
                    error={error}
                    formMethods={formMethods}
                >
                    <div>
                        <Label name="name">Block Name</Label>
                        <TextField
                            name="name"
                            validation={{ required: true }}
                        />
                    </div>
                    <Submit disabled={loading}>Create Time Block Type</Submit>
                </Form>
            </CustomModal>
        </>
    )
}

export default CreateTimeBlockType
