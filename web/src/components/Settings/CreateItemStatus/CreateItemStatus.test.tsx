import { render } from "@redwoodjs/testing/web"

import CreateItemStatus from "./CreateItemStatus"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CreateItemStatus", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CreateItemStatus />)
        }).not.toThrow()
    })
})
