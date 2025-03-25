import { render } from "@redwoodjs/testing/web"

import CreateSession from "./CreateSession"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CreateSession", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CreateSession />)
        }).not.toThrow()
    })
})
