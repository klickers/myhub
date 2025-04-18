import { render } from "@redwoodjs/testing/web"

import SkillPage from "./SkillPage"

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("SkillPage", () => {
    it("renders successfully", () => {
        expect(() => {
            render(<SkillPage />)
        }).not.toThrow()
    })
})
