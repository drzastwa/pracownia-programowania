const express = require('express');
const md5 = require('md5');
import User from './models/User';
import {database} from './database/database';

const cors = require('cors');

const bodyParser = require('body-parser');


module.exports = class App {
    constructor() {
    }

    async start() {
        try {
            await database.testConnection();

            const models = {
                User: User.init(database.getSequelizeInstance())
            }

            models.User.beforeCreate((async (user) => {
                const password = user.getDataValue('passwordMd5');
                const encryptedPassword = await md5(password);
                user.setDataValue('passwordMd5', encryptedPassword);
            }))

            const app = express();
            const PORT = 8000;

            app.use(cors({origin: '*'}));
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());

            //CREATE - POST
            app.post('/user', async (req, res) => {
                const {user} = req.body;
                if (user) {
                    console.log('[+] Adding new user', user);
                    const createdModel = await models.User.create(user);
                    return res.send(createdModel);

                } else {
                    return res.senxd({
                        type: "Error",
                    })
                }

            });

            //READ - GET
            app.get('/users', async (req, res) => {
                const response = await models.User.findAll({
                    where: {
                        isDeleted: false
                    }
                });
                return res.send(response);
            });

            app.get('/user:id', async (req, res) => {

            });


            //UPDATE - PUT
            /*app.put('/users/:userId', (req, res) => {
                return res.send(
                    `PUT HTTP method on user/${req.params.userId} resource`,
                );
            });*/

            //DELETE - DELETE

            app.delete('/user/:id', async (req, res) => {
                console.log('app delete called!', req.params.id);
                const {id} = req.params;

                const user = await models.User.findAll({
                    where: {
                        id
                    }
                })
                console.log('deleting user!', user[0].getDataValue('surname'), user[0].getDataValue('isDeleted'));

                await user[0].update({
                    isDeleted: true
                });

                return res.send(
                    `DELETE HTTP method on user/${id} resource`,
                );
            })

            app.listen(PORT, () => {
                console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
            });

        } catch (error) {
            console.log("[ERRROR] Couldn't connect to database!");
            console.log("{ERROR_MSG}: \n" + error);
        }
    }
}