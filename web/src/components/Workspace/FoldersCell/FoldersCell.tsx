import { useEffect, useRef, useState } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import Modal from "react-modal"
import Select from "react-select"
import slugify from "react-slugify"
import type { FoldersQuery, FoldersQueryVariables, Item } from "types/graphql"
import {
    CreateFolderMutation,
    CreateFolderMutationVariables,
    ItemType,
} from "types/graphql"

import {
    Form,
    Submit,
    SubmitHandler,
    TextField,
    useForm,
} from "@redwoodjs/forms"
import { NavLink, routes } from "@redwoodjs/router"
import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"
import { useMutation } from "@redwoodjs/web"
import { toast } from "@redwoodjs/web/toast"

interface FormValues {
    name: string
    slug: string
    //parentId: string
}

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        minWidth: "500px",
    },
}

Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.5)"
Modal.setAppElement("#redwood-app")

const CREATE_FOLDER = gql`
    mutation CreateFolderMutation($input: CreateItemInput!) {
        createItem(input: $input) {
            id
        }
    }
`

export const QUERY: TypedDocumentNode<FoldersQuery, FoldersQueryVariables> =
    gql`
        query FoldersQuery {
            folders {
                id
                name
                slug
                parent {
                    id
                }
                children {
                    id
                    name
                    slug
                }
            }
        }
    `

export const Loading = () => <div>Loading folders...</div>

export const Empty = () => <div>Create a folder!</div>

export const Failure = ({ error }: CellFailureProps<FoldersQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    folders,
}: CellSuccessProps<FoldersQuery, FoldersQueryVariables>) => {
    const [foldersList, setFoldersList] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)
    const [newFolderSlug, setNewFolderSlug] = useState("")
    const selectRef = useRef(null)

    useEffect(() => {
        const newFolders = []
        const folderRecur = (folder: Item, depth: number = 0) => {
            newFolders.push({
                ...folder,
                depth,
            })
            if (folder.children != null)
                folder.children.forEach((child) =>
                    folderRecur(child, depth + 1)
                )
        }
        folders
            .filter((folder: Item) => folder.parent == null)
            .forEach((folder: Item) => folderRecur(folder, 0))
        setFoldersList(newFolders)
    }, [folders])

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const formMethods = useForm()
    const [create, { loading, error }] = useMutation<
        CreateFolderMutation,
        CreateFolderMutationVariables
    >(CREATE_FOLDER, {
        onCompleted: () => {
            toast.success("Folder created!")
            formMethods.reset()
        },
        refetchQueries: [{ query: QUERY }],
        awaitRefetchQueries: true,
    })

    const onSubmitAddFolder: SubmitHandler<FormValues> = (data) => {
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
        closeModal()
    }

    return (
        <>
            <div className="mb-6 rounded-3xl bg-gray-100 py-6 px-3">
                <ul className="folders">
                    {foldersList.map((item) => (
                        <li
                            key={item.slug}
                            style={{ marginLeft: item.depth + "rem" }}
                        >
                            <NavLink
                                to={routes.workspaceFolder({ slug: item.slug })}
                                activeClassName="active-link"
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={openModal}>
                <Icon icon="gravity-ui:circle-plus" /> Add Folder
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Folder"
            >
                <button onClick={closeModal} className="float-right px-3">
                    <Icon icon="gravity-ui:circle-xmark" />
                </button>
                <h2>Create New Folder</h2>
                <Form
                    onSubmit={onSubmitAddFolder}
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
                        options={folders.map((item) => ({
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
            </Modal>
        </>
    )
}
