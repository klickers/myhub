import { useRef, useState } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import Select from "react-select"
import slugify from "react-slugify"
import {
    CreateFolderMutation,
    CreateFolderMutationVariables,
    Item,
    ItemType,
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
    folders: Array<Item>
}

interface FormValues {
    name: string
    slug: string
    description?: string
}

const CREATE_FOLDER = gql`
    mutation CreateFolderMutation($input: CreateItemInput!) {
        createItem(input: $input) {
            id
        }
    }
`

const CreateFolder = ({ query, folders }: Props) => {
    const modalRef = useRef()
    const selectRef = useRef(null)

    const [newFolderSlug, setNewFolderSlug] = useState("")

    const formMethods = useForm()
    const [create, { loading, error }] = useMutation<
        CreateFolderMutation,
        CreateFolderMutationVariables
    >(CREATE_FOLDER, {
        onCompleted: () => {
            toast.success("Folder created!")
            formMethods.reset()
            setNewFolderSlug("")
        },
        refetchQueries: [query],
        awaitRefetchQueries: true,
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        create({
            variables: {
                input: {
                    ...data,
                    type: "FOLDER" as ItemType,
                    ...(selectRef.current.state.selectValue.length > 0
                        ? {
                              parentId:
                                  selectRef.current.state.selectValue[0].value,
                          }
                        : null),
                },
            },
        })
        modalRef.current.closeModal()
    }

    return (
        <>
            <button onClick={() => modalRef.current.openModal()}>
                <Icon icon="gravity-ui:circle-plus" /> Add Folder
            </button>
            <CustomModal ref={modalRef}>
                <h2>Create New Folder</h2>
                <Form
                    onSubmit={onSubmit}
                    error={error}
                    formMethods={formMethods}
                >
                    <TextField
                        name="name"
                        placeholder="Folder Name"
                        onChange={(e) =>
                            setNewFolderSlug(slugify(e.target.value))
                        }
                        validation={{ required: true }}
                    />
                    <TextField
                        name="slug"
                        placeholder="folder-slug"
                        value={newFolderSlug}
                        validation={{ required: true }}
                    />
                    <Select
                        ref={selectRef}
                        name="parentId"
                        className="select"
                        placeholder="Parent Folder"
                        options={folders.map((item: Item) => ({
                            value: item.id,
                            label: item.name,
                        }))}
                        classNames={{
                            control: (state) =>
                                state.isFocused ? "focused" : "",
                            menuList: () => "menu-list",
                        }}
                    />
                    <Submit disabled={loading}>Create Folder</Submit>
                </Form>
            </CustomModal>
        </>
    )
}

export default CreateFolder
