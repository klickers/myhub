import { render } from "@redwoodjs/testing/web"

import CreateProject from "./CreateProject"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CreateProject", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CreateProject />)
        }).not.toThrow()
    })
})
