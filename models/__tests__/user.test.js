const UserModel = require("../user");
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
    {
        dialect: "postgres"
    }
);
const User = UserModel(sequelize, DataTypes);

describe("User model", () => {
    it("Check user model", () => {
        expect(User.tableName).toBe("Users");
        expect(User.primaryKeyField).toBe("id");
        expect(User.rawAttributes.id).toMatchObject({
                "type": DataTypes.INTEGER(),
                "allowNull": false,
                "primaryKey": true,
                "autoIncrement": true,
                "fieldName": "id"
            }
        );
        expect(User.rawAttributes.firstName).toMatchObject({
            "type": DataTypes.STRING(50),
            "allowNull": false,
            "fieldName": "firstName"
        });
        expect(User.rawAttributes.lastName).toMatchObject({
            "type": DataTypes.STRING(50),
            "allowNull": false,
            "fieldName": "lastName",
        });
        expect(User.rawAttributes.email).toMatchObject({
            "type": DataTypes.STRING(50),
            "allowNull": false,
            "fieldName": "email",
            "unique": true,
            "validate": {
                "isEmail": true
            }
        });
        expect(User.rawAttributes.username).toMatchObject({
            "type": DataTypes.STRING(50),
            "allowNull": false,
            "fieldName": "username",
            "unique": true,
        });
        expect(User.rawAttributes.createdAt).toMatchObject({
            "type": DataTypes.DATE(),
            "allowNull": false,
            "fieldName": "createdAt"
        });
        expect(User.rawAttributes.updatedAt).toMatchObject({
            "type": DataTypes.DATE(),
            "allowNull": false,
            "fieldName": "updatedAt"
        })
    });
    it("User model constructor", () => {
        const user1 = new User();
        expect(user1).toBeDefined();
        const user2 = new User({
            firstName: "Ivan",
            lastName: "Ivanov",
            email: "ivanov@example.org"
        });
        expect(user2.firstName).toBe("Ivan");
        expect(user2.lastName).toBe("Ivanov");
        expect(user2.email).toBe("ivanov@example.org");
    })
});
