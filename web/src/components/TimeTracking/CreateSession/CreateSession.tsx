import { useEffect, useRef, useState } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import Select from "react-select"
import {
    CreateTimeEntryMutation,
    CreateTimeEntryMutationVariables,
    Item,
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
import { useMutation, useQuery } from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

import CustomDatePicker from "src/components/CustomDatePicker/CustomDatePicker"
import CustomModal from "src/components/CustomModal/CustomModal"

interface Props {
    query: InternalRefetchQueryDescriptor
}

interface FormValues {
    name: string
}

const QUERY_ITEMS = gql`
    query ItemsForCreateTimeEntryQuery {
        activeItems {
            id
            name
            type
            status {
                name
            }
        }
    }
`

const CREATE_TIME_ENTRY = gql`
    mutation CreateTimeEntryMutation($input: CreateSessionInput!) {
        createSession(input: $input) {
            id
        }
    }
`

const CreateSession = ({ query }: Props) => {
    const modalRef = useRef()
    const selectRef = useRef(null)

    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    const [items, setItems] = useState([])
    const queryItems = useQuery(QUERY_ITEMS)

    useEffect(() => {
        if (queryItems.data) setItems(queryItems.data.activeItems)
    }, [queryItems])

    const formMethods = useForm()
    const [create, { loading, error }] = useMutation<
        CreateTimeEntryMutation,
        CreateTimeEntryMutationVariables
    >(CREATE_TIME_ENTRY, {
        onCompleted: () => {
            toast.success("Time entry added!")
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
                    type: "TRACKED",
                    start: startTime,
                    end: endTime,
                    itemId: selectRef.current.state.selectValue[0].value,
                },
            },
        })
        modalRef.current.closeModal()
    }

    return (
        <>
            <button onClick={() => modalRef.current.openModal()}>
                <Icon icon="gravity-ui:circle-plus" /> Add Time Entry
            </button>
            <CustomModal ref={modalRef}>
                <h2>Create Time Entry</h2>
                <Form
                    onSubmit={onSubmit}
                    error={error}
                    formMethods={formMethods}
                >
                    <div>
                        <Label name="itemId">Item</Label>
                        <Select
                            ref={selectRef}
                            name="itemId"
                            className="select"
                            placeholder="Select"
                            options={items.map((item: Item) => ({
                                value: item.id,
                                label: `${item.name} (${item.type})${item.status ? ` - ${item.status.name}` : ""}`,
                            }))}
                            classNames={{
                                control: (state) =>
                                    state.isFocused ? "focused" : "",
                                menuList: () => "menu-list",
                            }}
                            required
                        />
                    </div>
                    <div className="form-flexgroup">
                        <div>
                            <p>Start Time</p>
                            <CustomDatePicker
                                showTimeSelect
                                selectedDate={startTime}
                                onChangeFunction={setStartTime}
                            />
                        </div>
                        <div>
                            <p>End Time</p>
                            <CustomDatePicker
                                showTimeSelect
                                selectedDate={endTime}
                                onChangeFunction={setEndTime}
                            />
                        </div>
                    </div>
                    <div>
                        <Label name="notes">Notes</Label>
                        <TextAreaField name="notes" />
                    </div>
                    <Submit disabled={loading}>Add Time Entry</Submit>
                </Form>
            </CustomModal>
        </>
    )
}

export default CreateSession
