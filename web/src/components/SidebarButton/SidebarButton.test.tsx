import { render } from "@redwoodjs/testing/web"

import SidebarButton from "./SidebarButton"

describe("SidebarButton", () => {
    it("renders successfully", () => {
        expect(() => {
            render(
                <SidebarButton to="/" icon="gravity-ui:house" label="Home" />
            )
        }).not.toThrow()
    })
})
