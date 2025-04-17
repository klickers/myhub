import { useRef, useState } from "react"

import { Icon } from "@iconify/react/dist/iconify.js"
import Select from "react-select"
import slugify from "react-slugify"
import {
    CreateSkillMutation,
    CreateSkillMutationVariables,
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
    skills: Array<Item>
}

interface FormValues {
    name: string
    slug: string
    description?: string
}

const CREATE_SKILL = gql`
    mutation CreateSkillMutation($input: CreateItemInput!, $parents: [String]) {
        createItem(input: $input, parents: $parents) {
            id
        }
    }
`

const CreateSkill = ({ query, skills }: Props) => {
    const modalRef = useRef()
    const selectRef = useRef(null)

    const [newSkillSlug, setNewSkillSlug] = useState("")

    const formMethods = useForm()
    const [create, { loading, error }] = useMutation<
        CreateSkillMutation,
        CreateSkillMutationVariables
    >(CREATE_SKILL, {
        onCompleted: () => {
            toast.success("Skill created!")
            formMethods.reset()
            setNewSkillSlug("")
        },
        refetchQueries: [query],
        awaitRefetchQueries: true,
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        create({
            variables: {
                input: {
                    ...data,
                    type: "SKILL" as ItemType,
                },
                ...(selectRef.current.state.selectValue.length > 0
                    ? {
                          parents: selectRef.current.state.selectValue.map(
                              (parent) => parent.value
                          ),
                      }
                    : null),
            },
        })
        modalRef.current.closeModal()
    }

    return (
        <>
            <button onClick={() => modalRef.current.openModal()}>
                <Icon icon="gravity-ui:circle-plus" /> Add Skill
            </button>
            <CustomModal ref={modalRef}>
                <h2>Create New Skill</h2>
                <Form
                    onSubmit={onSubmit}
                    error={error}
                    formMethods={formMethods}
                >
                    <div className="form-flexgroup">
                        <div>
                            <Label name="name">Skill Name</Label>
                            <TextField
                                name="name"
                                onChange={(e) =>
                                    setNewSkillSlug(slugify(e.target.value))
                                }
                                validation={{ required: true }}
                            />
                        </div>
                        <div>
                            <Label name="slug">Slug</Label>
                            <TextField
                                name="slug"
                                value={newSkillSlug}
                                onChange={(e) =>
                                    setNewSkillSlug(slugify(e.target.value))
                                }
                                validation={{ required: true }}
                            />
                        </div>
                    </div>
                    <div>
                        <Label name="parentId">Parent Skills</Label>
                        <Select
                            ref={selectRef}
                            name="parentId"
                            className="select"
                            placeholder="Select"
                            options={skills.map((item: Item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            classNames={{
                                control: (state) =>
                                    state.isFocused ? "focused" : "",
                                menuList: () => "menu-list",
                            }}
                        />
                    </div>
                    <Submit disabled={loading}>Create Skill</Submit>
                </Form>
            </CustomModal>
        </>
    )
}

export default CreateSkill
