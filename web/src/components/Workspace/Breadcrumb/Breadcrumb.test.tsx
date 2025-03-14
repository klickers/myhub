import { render } from "@redwoodjs/testing/web"

import Breadcrumb from "./Breadcrumb"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("Breadcrumb", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<Breadcrumb />)
        }).not.toThrow()
    })
})
