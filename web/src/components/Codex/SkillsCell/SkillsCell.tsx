import { useEffect, useState } from "react"

import type {
    SkillsQuery,
    SkillsQueryVariables,
    Item,
    ItemType,
} from "types/graphql"

import { NavLink } from "@redwoodjs/router"
import type {
    CellSuccessProps,
    CellFailureProps,
    TypedDocumentNode,
} from "@redwoodjs/web"

import { QUERY_SKILLS } from "src/graphql/queries/getSkills.query"

import CreateSkill from "../CreateSkill/CreateSkill"

export const QUERY: TypedDocumentNode<SkillsQuery, SkillsQueryVariables> =
    QUERY_SKILLS

export const Loading = () => (
    <div className="mb-6 rounded-3xl border border-black p-6">
        <p>Loading skills...</p>
    </div>
)

export const Empty = () => (
    <>
        <CreateSkill
            query={{
                query: QUERY,
            }}
            skills={[]}
        />
        <div className="mt-6 rounded-3xl border border-black p-6">
            <p>Create a skill!</p>
        </div>
    </>
)

export const Failure = ({ error }: CellFailureProps<SkillsQueryVariables>) => (
    <div style={{ color: "red" }}>Error: {error?.message}</div>
)

export const Success = ({
    skills,
}: CellSuccessProps<SkillsQuery, SkillsQueryVariables>) => {
    const [skillsList, setSkillsList] = useState([])

    useEffect(() => {
        const newSkills = []
        const skillRecur = (skill: Item, depth: number = 0) => {
            newSkills.push({
                ...skill,
                depth,
            })
            if (skill?.childrenExplicit.length > 0)
                skill.childrenExplicit.forEach((child) => {
                    if (child.type == ("SKILL" as ItemType))
                        skillRecur(
                            skills.find((s) => s.id == child.id) as Item,
                            depth + 1
                        )
                })
        }
        skills
            .filter((skill) => skill.parents.length == 0)
            .forEach((skill) => skillRecur(skill as Item, 0))
        setSkillsList(newSkills)
    }, [skills])

    return (
        <>
            <CreateSkill
                query={{
                    query: QUERY,
                }}
                skills={skills as Item[]}
            />
            <div className="mt-6 rounded-3xl border border-black p-6">
                <ul className="skills space-y-1">
                    {skillsList.map((item) => (
                        <li
                            key={item.id}
                            style={{ marginLeft: item.depth * 1 + "rem" }}
                        >
                            <NavLink to="#!" activeClassName="active-link">
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
