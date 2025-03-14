import { render } from "@redwoodjs/testing/web"

import CustomModal from "./CustomModal"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CustomModal", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CustomModal />)
        }).not.toThrow()
    })
})
