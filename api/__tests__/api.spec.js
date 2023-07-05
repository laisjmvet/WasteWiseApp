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
        let username = ""
        let password = ""
        let token = ""
        let user_id = ""

        //REGISTER
        it("should create a new user", async () => {
            const newUser = {
                name: "test name",
                house_number: 1,
                street_name: "Apple Street",
                postcode: "GL1 1AB",
                username: "testusername",
                password: "testpassword"
            }
            const response = await request(app)
                .post("/users/register")
                .send(newUser)
                .expect(201)
            username = response.body.username
            password = response.body.password            
            expect(username).toEqual(newUser.username)
        })

        //LOGIN
        it("should login the user", async () => {
            const user = {
                username: username,
                password: "testpassword"
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
                .get(`/users/username/${username}`)
                .send(user)
                .expect(200)
            
            user_id = response.body.id
            expect(response.body.username).toEqual(username)
            expect(response.body.password).toEqual(password)
            })

        //GETUSERBYID
        it("should return the user with provided ID", async () => {
            const response = await request(app)
                .get(`/users/${user_id}`)
                .expect(200)

            expect(response.body.username).toEqual(username)
        })

        //SHOW ALL
        it("should return all users", async () => {
            const response = await request(app)
                .get("/users")
                .expect(200)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        //UPDATE ADMIN
        it("should change admin status", async () => {
            const admin = true
            const body = {
                admin: admin
            }
            const response = await request(app)
                .patch(`/users/admin/${username}`)
                .send(body)
                .expect(200)
            //FIX THISSSSSSSSSS OR SOMETHING
            console.log(response.body.isAdmin + "<><><><><><><><><><><>><><<<<")
            //expect()
        })

        //UPDATE POINTS
        it("should update the users points", async () => {
            const points = 5
            const body = {
                points: points
            }
            const response = await request(app)
                .patch(`/users/points/${username}`)
                .send(body)
                .expect(200)
            
            expect(response.body.points).toEqual(points)
        })

        //UPDATE USERS ADDRESS
        it("should update a users address", async () => {

        })

        // //LOGOUT
        it("should logout the user", async () => {

        })
    })

    //ADDRESS TESTING
    describe("ADDRESS", () => {
        let addressId

        //READ ALL
        it("should get all address", async () => {
            const response = await request(app)
                .get("/address")
                .expect(200)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        //CREATE ADDRESS
        it("should create an address", async () => {
            const newAddress = {
                street_name: "testStreet",
                house_number: "2",
                postcode: "AA1 AA1"
                //ADD ZONE ID WHEN FIXED
            }
            const response = await request(app)
                .post("/address")
                .send(newAddress)
                .expect(201)

            const {address_id} = response.body
            addressId = address_id

            expect(response.body).toMatchObject(newAddress)
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
