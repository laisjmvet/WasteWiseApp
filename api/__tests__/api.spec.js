const request = require("supertest")
const app = require("../api")
const db = require("../database/connect")

describe("backend", () => {
    let api

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log("Test server running on port 5000")
        })
    })

    afterAll((done) => {
        console.log("Stopping test server")
        db.end()
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

        //GET USER BY USERNAME
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

        //GET USER BY ID
        it("should return the user with provided ID", async () => {
            const response = await request(app)
                .get(`/users/${user_id}`)
                .expect(200)

            expect(response.body.username).toEqual(username)
        })

        //GET ALL
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
                isadmin: admin
            }
            const response = await request(app)
                .patch(`/users/admin/${username}`)
                .send(body)
                .expect(200)

            expect(response.body.isAdmin).toEqual(admin)
        })

        //UPDATE USERS POINTS
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
            const addressId = 2
            const body = {
                address_id: addressId
            }
            const response = await request(app)
                .patch(`/users/address/${username}`)
                .send(body)
                .expect(200)

            expect(response.body.address_id).toEqual(addressId)
        })

        //LOGOUT NEEDS FIXING??
        it("should logout the user", async () => {
            const res = await db.query("SELECT token FROM token WHERE user_id = $1", [user_id])
            const token = res.rows[0]
            headers = {
                authorization: token
            }

            const response = await request(app)
                .get("/users/logout")
                .set(headers)
                .expect(200)
        })

        //DELETE USER
        it("should delete the user", async () => {
            const response = await request(app)
                .delete(`/users/${user_id}`)
                .expect(204)
        })
    })

    //ADDRESS TESTING
    describe("ADDRESS", () => {
        let addressId
        let newAddress = {
            street_name: "testStreet",
            house_number: 2,
            postcode: "AA1 AA1",
            zone_id: 2
        }

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
            const response = await request(app)
                .post("/address")
                .send(newAddress)
                .expect(201)

            const {id} = response.body
            addressId = id

            expect(response.body).toMatchObject(newAddress)
        })

        //GET ADDRESS BY ID
        it("should get address by id", async () => {
            const response = await request(app)
                .get(`/address/${addressId}`)
                .expect(200)

            expect(response.body).toMatchObject(newAddress)
        })

        //GET ADDRESS BY HOUSE NUMBER/POSTCODE
        it("should get address by house number/postcode", async () => {
            const body = {
                house_number: newAddress.house_number,
                postcode: newAddress.postcode
            }
            const response = await request(app)
                .get(`/address/user/0`)
                .send(body)
                .expect(200)

            expect(response.body).toMatchObject(newAddress)
        })

        //UPDATE ADDRESS
        it("should update address", async () => {
            newAddress.street_name = "newteststreet"
            const response = await request(app)
                .patch(`/address/${addressId}`)
                .send(newAddress)
                .expect(200)

            expect(response.body).toMatchObject(newAddress)
        })

        //DELETE ADDRESS
        it("should delete address", async () => {
            const response = await request(app)
                .delete(`/address/${addressId}`)
                .expect(204)
        })

    })

    //OBJECT TESTING
    describe("OBJECT", () => {
        let objectId
        let newObject = {
            name: "testObject",
            material_type_id: 1,
            bin_type_id: 2
        }

        //GET ALL
        it("should return all objects", async () => {
            const response = await request(app)
                .get(`/object`)
                .expect(200)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        //CREATE
        it("should create an object", async () => {
            const response = await request(app)
                .post(`/object`)
                .send(newObject)
                .expect(201)

            objectId = response.body.id
            expect(response.body).toMatchObject(newObject)
        })

        //GET ONE
        it("should return one object", async () => {
            const response = await request(app)
                .get(`/object/${objectId}`)
                .expect(200)

            expect(response.body).toMatchObject(newObject)
        })

        //SEARCH INPUT
        it("should return objects with similar names", async () => {
            const input = "test"
            const response = await request(app)
                .get(`/object/search/${input}`)
                .expect(200)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        //UPDATE INPUT
        it("should update an object", async () => {
            newObject.name = "newtestobject"
            const response = await request(app)
                .patch(`/object/${objectId}`)
                .send(newObject)
                .expect(200)
        })

        //DELETE INPUT
        it("should delete an object", async () => {
            const response = await request(app)
                .delete(`/object/${objectId}`)
                .expect(204)
        })
    })

    //COLLECTDAYS TESTING
    describe("COLLECTDAYS", () => {
        let collectId
        let newCollectDay = {
            bin_type_id: 2,
            weekday_id: 5,
            zone_id: 2
        }

        //GET ALL
        it("should return all collection days", async () => {
            const response = await request(app)
                .get(`/collectDay`)
                .expect(200)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        //CREATE NEW COLLECTDAY
        it("should create a new collection day", async () => {
            const response = await request(app)
                .post(`/collectDay`)
                .send(newCollectDay)
                .expect(201)

            collectId = response.body.id
            expect(response.body).toMatchObject(newCollectDay)
        })

        //GET BY ZONE ID
        // it("should return by zone id", async () => {
        //     const response = await request(app)
        //         .get(`/collectDay/zone/${newCollectDay.zone_id}`)
        //         .expect(200)

        //     expect(response.body).toEqual(expect.arrayContaining(newCollectDay))
        // })

        //GET BY ID
        it("should return by collectId", async () => {
            const response = await request(app)
                .get(`/collectDay/${collectId}`)
                .expect(200)

            expect(response.body).toMatchObject(newCollectDay)
        })

        //UPDATE COLLECT DAY
        it("should update the collection day", async () => {
            newCollectDay.weekday_id = 3
            newCollectDay.zone_id = 4
            newCollectDay.bin_type_id = 1

            const response = await request(app)
                .patch(`/collectDay/${collectId}`)
                .send(newCollectDay)
                .expect(200)

            expect(response.body).toMatchObject(newCollectDay)
        })

        //DELETE COLLECT DAY
        it("should delete the collection day", async () => {
            const response = await request(app)
                .delete(`/collectDay/${collectId}`)
                .expect(204)
        })
    })

    //BULKYWASTE TESTING
    describe("BULKYWASTE", () => {
        let bulkyWasteId
        let newBulkyWaste = {
            weight_kg: 20,
            price: 50
        }

        //GET ALL
        it("should get all entries", async () => {
            const response = await request(app)
                .get(`/collectBulkyWaste`)
                .expect(200)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        //CREATE NEW
        it("should create a new entry", async () => {
            const response = await request(app)
                .post(`/collectBulkyWaste`)
                .send(newBulkyWaste)
                .expect(201)

            bulkyWasteId = response.body.id
            expect(response.body.price).toEqual(newBulkyWaste.price)
            expect(response.body.weight_kg).toEqual(newBulkyWaste.weight_kg)
        })

        //GET BY ID
        it("should get the entry with id", async () => {
            const response = await request(app)
                .get(`/collectBulkyWaste/${bulkyWasteId}`)
                .expect(200)

            expect(response.body.price).toEqual(newBulkyWaste.price)
            expect(response.body.weight_kg).toEqual(newBulkyWaste.weight_kg)
        })

        //UPDATE BY ID
        it("should update an entry by id", async () => {
            newBulkyWaste.weight_kg = 30
            newBulkyWaste.price = 70

            const response = await request(app)
                .patch(`/collectBulkyWaste/${bulkyWasteId}`)
                .send(newBulkyWaste)
                .expect(200)
            expect(response.body.price).toEqual(newBulkyWaste.price)
            expect(response.body.weight_kg).toEqual(newBulkyWaste.weight_kg)
        })

        //DELETE BY ID
        it("should delete an entry by id", async () => {
            const response = await request(app)
                .delete(`/collectBulkyWaste/${bulkyWasteId}`)
                .expect(204)
        })
    })

    //BIN TESTING
    describe("BIN", () => {
        let binId
        let newBin = {
            bin_type_name: "testBin"
        }

        //GET ALL
        it("should get all bins", async () => {
            const response = await request(app)
                .get(`/bin`)
                .expect(200)

            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body.length).toBeGreaterThan(0)
        })

        //CREATE
        it("should create a bin", async () => {
            const response = await request(app)
                .post(`/bin`)
                .send(newBin)
                .expect(201)

            binId = response.body.bin_type_id
            expect(response.body.bin_type_name).toEqual(newBin.bin_type_name)
        })

        //GET ONE BY ID
        it("should get a bin with id", async () => {
            const response = await request(app)
                .get(`/bin/${binId}`)
                .expect(200)

                expect(response.body.bin_type_name).toEqual(newBin.bin_type_name)
        })

        //GET ONE BY NAME
        // it("should get a bin with name", async () => {
        //     const response = await request(app)
        //         .get(`/bin/`)//wait for route update
        //         .expect(200)

        //     expect(response.body.bin_type_name).toEqual(newBin.bin_type_name)
        // })

        //UPDATE BY ID
        it("should update a bin with id", async () => {
            newBin.bin_type_name = "newTestBin"
            const response = await request(app)
                .patch(`/bin/${binId}`)
                .send(newBin)
                .expect(200)

                expect(response.body.bin_type_name).toEqual(newBin.bin_type_name)
        })

        //DELETE BY ID
        it("should delete a bin with id", async () => {
            const response = await request(app)
                .delete(`/bin/${binId}`)
                .expect(204)
        })
    })

    //WEEKDAY TESTING
    describe("WEEKDAY", () => {

    })

    //APPOINTMENT TESTING
    describe("APPOINTMENT", () => {

    })

    //ADDRESSZONE TESTING
    describe("ADDRESS ZONE", () => {

    })

    //MATERIAL TYPE TESTING
    describe("MATERIAL TYPE", () => {

    })
})
