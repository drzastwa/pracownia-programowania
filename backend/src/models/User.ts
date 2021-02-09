const Sequelize = require("sequelize");
const md5 = require("md5");

type UserAttributes = {
    id?: string,
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
                    type: Sequelize.DataTypes.UUIDV4,
                    defaultValue: Sequelize.UUIDV4,
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
}



// User.afterCreate((user) => {
//     console.log('i am creating user biiiiiitch', user);
// });
