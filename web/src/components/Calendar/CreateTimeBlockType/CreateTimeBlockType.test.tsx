import { render } from "@redwoodjs/testing/web"

import CreateTimeBlockType from "./CreateTimeBlockType"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CreateTimeBlockType", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CreateTimeBlockType />)
        }).not.toThrow()
    })
})
