import { render } from "@redwoodjs/testing/web"

import CreateSkill from "./CreateSkill"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CreateSkill", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CreateSkill />)
        }).not.toThrow()
    })
})
