import { render } from "@redwoodjs/testing/web"

import WorkspaceLayout from "./WorkspaceLayout"

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("WorkspaceLayout", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<WorkspaceLayout />)
        }).not.toThrow()
    })
})
