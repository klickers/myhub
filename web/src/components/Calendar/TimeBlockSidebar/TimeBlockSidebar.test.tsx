import { render } from "@redwoodjs/testing/web"

import TimeBlockSidebar from "./TimeBlockSidebar"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("TimeBlockSidebar", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<TimeBlockSidebar />)
        }).not.toThrow()
    })
})
