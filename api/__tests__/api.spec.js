const request = require("supertest")
const app = require("../api")

describe("api server", () => {
    let api

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log("Test server running on port 5000")
        })
    })

    afterAll((done) => {
        console.log("Stopping test server")
        api.close(done)
    })
    //USER TESTING
    describe("USER", () => {
        //REGISTER
        let username = ""
        let password = ""
        let token = ""
        it("should create a new user", async () => {
            const newUser = {
                username: "testusername",
                password: "testpassword",
                isAdmin: "false"
            }
            const response = await request(app)
                .post("/users/register")
                .send(newUser)
                .expect(201)
            
            username = response.body.username
            password = response.body.password

            expect(response.body).toMatchObject(newUser)
        })

        //LOGIN
        it("should login the user", async () => {
            const user = {
                username: username,
                password: password
            }
            const response = await request(app)
                .post("/users/login")
                .send(user)
                .expect(200)
            
            token = response.token
        })

        // //LOGOUT
        // it("should logout the user", async () => {

        // })
    })

    //ADDRESS TESTING
    // describe("ADDRESS", () => {
    //     let addressId

    // })

    // //OBJECT TESTING
    // describe("OBJECT", () => {
        
    // })

    // //COLLECTDAYS TESTING
    // describe("COLLECTDAYS", () => {
        
    // })

    // //BULKYWASTE TESTING
    // describe("BULKYWASTE", () => {
        
    // })
})
