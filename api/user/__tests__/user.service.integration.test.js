const {createUser, deleteUsers, findUsers, updateUsers} = require("../user.service");

describe("Integration users service test", () => {
    it("should throw error for empty user", async () => {
        try {
            await createUser({});
        } catch (err) {
            expect(err.name).toBe("SequelizeValidationError");
            expect(err.errors).toHaveLength(4);
            expect(err.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "message": "User.firstName cannot be null",
                        "type": "notNull Violation",
                        "path": "firstName",
                        "value": null,
                        "validatorKey": "is_null",
                    })
                ])
            );
            expect(err.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "message": "User.lastName cannot be null",
                        "type": "notNull Violation",
                        "path": "lastName",
                        "value": null,
                        "validatorKey": "is_null",
                    })
                ])
            );
            expect(err.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "message": "User.email cannot be null",
                        "type": "notNull Violation",
                        "path": "email",
                        "value": null,
                        "validatorKey": "is_null",
                    })
                ])
            );
            expect(err.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "message": "User.username cannot be null",
                        "type": "notNull Violation",
                        "path": "username",
                        "value": null,
                        "validatorKey": "is_null",
                    })
                ])
            );
        }
    })
    it("should throw error for malformed email", async () => {
        try {
            await createUser({firstName: "Ivan", lastName: "Ivanov", email: "ivanivanov"});
        } catch (err) {
            expect(err.name).toBe("SequelizeValidationError");
            expect(err.errors).toHaveLength(1);
            expect(err.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "message": "Validation isEmail on email failed",
                        "type": "Validation error",
                        "path": "email",
                        "value": "ivanivanov",
                        "validatorKey": "isEmail",
                    })
                ])
            );
        }
    });
    it("should successful create user with generated username", async () => {
        const user = await createUser({firstName: "Ivan", lastName: "Ivanov", email: "ivanivanov@example.org"});
        expect(user.firstName).toBe("Ivan");
        expect(user.lastName).toBe("Ivanov");
        expect(user.email).toBe("ivanivanov@example.org");
        expect(user.username).toBe("ivanivanov");
        expect(user.id).toBeDefined();
    });
    it("should throw error for duplicated email", async () => {
            try {
                const user = await createUser({firstName: "Ivan", lastName: "Ivanov", email: "ivanivanov@example.org"});
            } catch (err) {
                expect(err.name).toBe("SequelizeUniqueConstraintError");
                expect(err.errors).toHaveLength(1);
                expect(err.errors).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            "message": "email must be unique",
                            "type": "unique violation",
                            "path": "email",
                            "value": "ivanivanov@example.org",
                            "validatorKey": "not_unique",
                        })
                    ])
                );
            }
        }
    )
    ;
    it("should successful create user", async () => {
        const user = await createUser({
            firstName: "Petr",
            lastName: "Petrov",
            email: "petrov@example.org",
            username: "petr_petrov"
        });
        expect(user.firstName).toBe("Petr");
        expect(user.lastName).toBe("Petrov");
        expect(user.email).toBe("petrov@example.org");
        expect(user.username).toBe("petr_petrov");
        expect(user.id).toBeDefined();
    });
    it("should successful return all users", async () => {
        const users = await findUsers({});
        expect(users).toHaveLength(2);
    });
    it("should successful update user", async () => {
        const [count] = await updateUsers({username: 'ivanivanov'}, {
            email: "ivanov@example.org"
        });
        expect(count).toBe(1);
        const users = await findUsers({username: 'ivanivanov'});
        expect(users[0].email).toBe("ivanov@example.org");
    })
    it("should successful delete user", async () => {
        const count = await deleteUsers({
            username: "petr_petrov"
        });
        expect(count).toBe(1);
        const users = await findUsers({});
        expect(users).toHaveLength(1);
    });
    it("should successful delete all users", async () => {
        const count = await deleteUsers({});
        expect(count).toBe(1);
        const users = await findUsers({});
        expect(users).toHaveLength(0);
    });
})
