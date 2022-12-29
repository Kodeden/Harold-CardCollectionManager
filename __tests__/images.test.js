import request from "supertest";
import createServer from "../utils/startRestServer.js";
import mockController from "../controllers/images.controller.js";

jest.mock("../controllers/images.controller.js");
mockController.createImage = jest.fn(() => Promise.resolve({ rows: [{ id: 1}]}))
const app = createServer();
// const exampleUser = {
//     username: "Bobby Tables",
//     password: "password",
//     haircolor: "brown"
// }

describe ("Images", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Test invalid route", () => {
        it("Should return a 404", async () => {
            await request(app).get("/image").expect(404);
        });
    });

    // describe("Get all Users", () => {
    //     it("Should get all the users", async () => {
    //         const { statusCode , body } = await request(app).get("/user");
    //         expect(statusCode).toBe(200);
    //         expect(body[0].id).toBe(1);
    //         expect(mockRepo.findAllUsers).toHaveBeenCalledTimes(1)
    //     });
    // });

    // describe("Create a user", () => {
    //     it("Should return the id of Bob", async() => {
    //         const { statusCode , body } = await request(app).post("/user").send(exampleUser);
    //         const {username, password, haircolor } = exampleUser;
    //         expect(statusCode).toBe(200);
    //         expect(body[0].id).toBe(1);
    //         expect(mockRepo.createUser).toHaveBeenCalledTimes(1);
    //         expect(mockRepo.createUser).toHaveBeenCalledWith(username, password, haircolor);
    //     });
    // });

    // describe("Edit a user", () => {
    //     it("Should return the rows of Bob", async() => {
    //         const {username, password, haircolor } = exampleUser;
    //         const { statusCode , body } = await request(app).put("/user/1").send({haircolor, username});
    //         expect(statusCode).toBe(200);
    //         expect(body[0].id).toBe(1);
    //         expect(mockRepo.findOneUser).toHaveBeenCalledTimes(1);
    //         expect(mockRepo.updateUser).toHaveBeenCalledTimes(1);
    //         expect(mockRepo.updateUser).toHaveBeenCalledWith(haircolor, username, '1');
    //     });
    // });

    // describe("Delete a user", () => {
    //     it("Should return empty array", async() => {
    //         const { statusCode , body } = await request(app).delete("/user/1");
    //         expect(statusCode).toBe(200);
    //         expect(body[0].id).toBe(1);
    //         expect(mockRepo.deleteUser).toHaveBeenCalledTimes(1);
    //         expect(mockRepo.deleteUser).toHaveBeenCalledWith('1');
    //     });
    // });

});
