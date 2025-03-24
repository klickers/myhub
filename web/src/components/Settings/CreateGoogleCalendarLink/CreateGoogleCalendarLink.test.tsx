import { render } from "@redwoodjs/testing/web"

import CreateGoogleCalendarLink from "./CreateGoogleCalendarLink"

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("CreateGoogleCalendarLink", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<CreateGoogleCalendarLink />)
        }).not.toThrow()
    })
})
