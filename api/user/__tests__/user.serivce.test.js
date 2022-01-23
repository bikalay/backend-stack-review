const {createUser, updateUsers, deleteUsers, findUsers} = require("../user.service");

const {User} = require("../../../models");
jest.mock("../../../models", () => {
    return {
        User: {
            create: jest.fn((obj) => {
                return Promise.resolve(obj)
            }),
            update: jest.fn((query, obj) => {
                return Promise.resolve([query, obj]);
            }),
            destroy: jest.fn((query) => {
                return Promise.resolve(query);
            }),
            findAll: jest.fn((query) => Promise.resolve(query))
        }
    }
})

describe("User Service", () => {
    it("createUser", async () => {
        const user1 = {
            firstName: "Ivan",
            lastName: "Ivanov",
            email: "ivan@example.org"
        }
        await createUser(user1);
        expect(User.create).toHaveBeenCalledWith({
            firstName: "Ivan",
            lastName: "Ivanov",
            email: "ivan@example.org",
            username: "ivan"
        });
        const user2 = {
            firstName: "Petr",
            lastName: "Petrov",
            email: "petr@example.org",
            username: "petrov"
        }
        await createUser(user2);
        expect(User.create).toHaveBeenCalledWith({
            firstName: "Petr",
            lastName: "Petrov",
            email: "petr@example.org",
            username: "petrov"
        })
    });
    it("updateUsers", async () => {
        const userData = {
            firstName: "Sidor",
            lastName: "Sidorov",
            email: "sidor@example.org",
            username: "sidorov"
        }
        await updateUsers({id: 1}, userData);
        expect(User.update).toHaveBeenCalledWith(userData, {where: {id: 1}});
    });
    it("deleteUsers", async () => {
        await deleteUsers({id: 1});
        expect(User.destroy).toHaveBeenCalledWith({where: {id: 1}});
    });
    it("findUsers", async () => {
        await findUsers({id: 1});
        expect(User.findAll).toHaveBeenCalledWith({where: {id: 1}});
    });
});
