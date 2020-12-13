const express = require('express');
import User from './models/User';
import {database} from './database/database';
import faker from 'faker';
import {v4 as uuid} from 'uuid';

const cors = require('cors');


module.exports = class App {
    constructor() {
    }

    async start() {


        try {
            await database.testConnection();

            const models = {
                User: User.init(database.getSequelizeInstance())
            }


            const app = express();
            const PORT = 8000;

            app.use(cors({origin: '*'}));

            //CREATE - POST
            app.post('/user', async (req, res) => {
                const userData = {
                    id: uuid(),
                    name: faker.name.firstName(),
                    surname: faker.name.lastName(),
                    login: faker.internet.userName(),
                    passwordMd5: faker.lorem.word(),
                    isDeleted: false,
                };

                const createdUser = await models.User.create(userData)

                return res.send(userData);
            });

            //READ - GET
            app.get('/users', async (req, res) => {
                const response = await models.User.findAll();
                return res.send(response);
            });

            app.get('/user:id', async (req, res) => {

                // return res.send(response);
            });


            //UPDATE - PUT
            /*app.put('/users/:userId', (req, res) => {
                return res.send(
                    `PUT HTTP method on user/${req.params.userId} resource`,
                );
            });*/

            //DELETE - DELETE
            app.delete('/users/:userId', (req, res) => {
                return res.send(
                    `DELETE HTTP method on user/${req.params.userId} resource`,
                );
            });


            app.listen(PORT, () => {
                console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
            });

        } catch (error) {
            console.log("[ERRROR] Couldn't connect to database!");
            console.log("{ERROR_MSG}: \n" + error);
        }
    }
}