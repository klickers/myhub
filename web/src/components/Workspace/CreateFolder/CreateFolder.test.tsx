import { render } from "@redwoodjs/testing/web"

import CreateFolder from "./CreateFolder"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CreateFolder", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CreateFolder />)
        }).not.toThrow()
    })
})
