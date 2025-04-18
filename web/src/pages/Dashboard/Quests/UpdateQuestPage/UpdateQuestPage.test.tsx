import { render } from "@redwoodjs/testing/web"

import UpdateQuestPage from "./UpdateQuestPage"

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("UpdateQuestPage", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<UpdateQuestPage />)
        }).not.toThrow()
    })
})
