import { render } from "@redwoodjs/testing/web"

import UpdateProjectPage from "./UpdateProjectPage"

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("UpdateProjectPage", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<UpdateProjectPage />)
        }).not.toThrow()
    })
})
