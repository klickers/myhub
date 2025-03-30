import { render } from "@redwoodjs/testing/web"

import PlayTimeEntry from "./PlayTimeEntry"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("PlayTimeEntry", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<PlayTimeEntry />)
        }).not.toThrow()
    })
})
