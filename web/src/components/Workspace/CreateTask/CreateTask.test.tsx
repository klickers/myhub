import { render } from "@redwoodjs/testing/web"

import CreateTask from "./CreateTask"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CreateTask", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CreateTask />)
        }).not.toThrow()
    })
})
