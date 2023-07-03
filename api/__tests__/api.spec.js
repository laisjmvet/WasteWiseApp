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

            expect(response.body.username).toMatchObject(newUser.username)
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

        //GETUSERBYUSERNAME
        it("should return the user with provided username", async () => {
            const user = {
                username: username
            }
            const response = await request(app)
                .get("/users/username")
                .send(user)
                .expect(200)

                expect(response.body.username).toEqual(username)
                expect(response.body.password).toEqual(password)
            })

        // //LOGOUT
        // it("should logout the user", async () => {

        // })
    })

    //ADDRESS TESTING
    describe("ADDRESS", () => {
        let addressId

        it("should create an address", async () => {
            const address = {
                street_name: "testStreet",
                street_number: 2,
                postcode: "TE0 ST0"
            }
            const response = await request(app)
                .post("/address")
                .send(address)
                .expect(201)

            //add comparison
        })

    })

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
