const { renderDOM } = require("./helpers")

let dom
let document

describe("FRONTEND", () => {

    beforeEach(async () => {
        dom = await renderDOM("./index.html")
        document = await dom.window.document
    })

    //INDEX
    describe("index.html", () => {
        
        it("has a button", () => {
            const btn = document.querySelector("button")
            expect(btn).toBeTruthy
        })

        it("the button does this", () => {
            const btn = document.querySelector("button")
            btn.click()
        })
    })

})
