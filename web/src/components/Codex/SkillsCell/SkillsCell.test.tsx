import { render } from "@redwoodjs/testing/web"

import SkillsCell from "./SkillsCell"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("SkillsCell", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<SkillsCell />)
        }).not.toThrow()
    })
})
