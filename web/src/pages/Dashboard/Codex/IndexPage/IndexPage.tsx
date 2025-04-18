import { Metadata } from "@redwoodjs/web"

import SkillsCell from "src/components/Codex/SkillsCell"

const IndexPage = () => {
    return (
        <>
            <Metadata title="Skill Codex" description="Skill codex page" />

            <h1>Skill Codex</h1>
            <SkillsCell />
        </>
    )
}

export default IndexPage
