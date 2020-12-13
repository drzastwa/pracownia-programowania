const Sequelize = require("sequelize");

type UserAttributes = {
    id: number,
    name: string,
    surname: string,
    login: string,
    dateOfBirth: string,
    passwordMd5: string,
    isDeleted: string,
}

export default class User extends Sequelize.Model<UserAttributes, UserAttributes> {
    static init(sequelize) {
        return super.init({
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                surname: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                login: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                dateOfBirth: {
                    type: Sequelize.DataTypes.DATEONLY,
                },
                passwordMd5: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                },
                isDeleted: {
                    type: Sequelize.DataTypes.BOOLEAN,
                    allowNull: false,

                }
            }, {
                tableName: 'users',
                timestamps: false,
                sequelize
            },
        );
    }

    f
}

