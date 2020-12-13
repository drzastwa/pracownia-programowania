import {Sequelize} from "sequelize";

class Database {
    private readonly sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(
            'db',
            'kamil',
            'zaq1@WSX',
            {
                host: 'localhost',
                port: 3306,
                dialect: 'mysql'
            }
        );
    }

    public testConnection = async () => {
        return this.sequelize.authenticate();
    }

    public getSequelizeInstance = ()=>{
        return this.sequelize;
    }

}

export const database = new Database();