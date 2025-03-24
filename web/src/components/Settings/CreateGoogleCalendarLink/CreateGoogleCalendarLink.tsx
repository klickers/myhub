import { useRef } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import {
    CreateGoogleCalendarLinkMutation,
    CreateGoogleCalendarLinkMutationVariables,
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

const CREATE_GOOGLE_CALENDAR_LINK = gql`
    mutation CreateGoogleCalendarLinkMutation(
        $input: CreateGoogleCalendarLinkInput!
    ) {
        createGoogleCalendarLink(input: $input) {
            id
        }
    }
`

const CreateGoogleCalendarLink = ({ query }: Props) => {
    const modalRef = useRef()

    const formMethods = useForm()
    const [create, { loading, error }] = useMutation<
        CreateGoogleCalendarLinkMutation,
        CreateGoogleCalendarLinkMutationVariables
    >(CREATE_GOOGLE_CALENDAR_LINK, {
        onCompleted: () => {
            toast.success("Google calendar link created!")
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
                <Icon icon="gravity-ui:circle-plus" /> Add Link
            </button>
            <CustomModal ref={modalRef}>
                <h2>Create Google Calendar Link</h2>
                <Form
                    onSubmit={onSubmit}
                    error={error}
                    formMethods={formMethods}
                >
                    <div>
                        <Label name="title">Title</Label>
                        <TextField name="title" />
                    </div>
                    <div>
                        <Label name="calendarLink">ID Link</Label>
                        <TextField
                            name="calendarLink"
                            validation={{ required: true }}
                        />
                    </div>
                    <div>
                        <Label name="classes">Style Classes</Label>
                        <TextField name="classes" />
                    </div>
                    <Submit disabled={loading}>
                        Create Google Calendar Link
                    </Submit>
                </Form>
            </CustomModal>
        </>
    )
}

export default CreateGoogleCalendarLink
