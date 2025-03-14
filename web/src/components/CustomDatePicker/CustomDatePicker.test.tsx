import { render } from "@redwoodjs/testing/web"

import CustomDatePicker from "./CustomDatePicker"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CustomDatePicker", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CustomDatePicker />)
        }).not.toThrow()
    })
})
