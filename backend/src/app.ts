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
        const PORT = 8000;

        try {
            const app = express();
            app.use(cors({origin: '*'}));
            app.use(bodyParser.urlencoded({
                extended: true
            }));

            app.use(bodyParser.json());
            await database.testConnection();


            const models = {
                User: User.init(database.getSequelizeInstance())
            }

            //password md5 crypting
            models.User.beforeCreate((async (user) => {
                const password = user.getDataValue('passwordMd5');
                const encryptedPassword = await md5(password);
                user.setDataValue('passwordMd5', encryptedPassword);
            }));

            //CREATE - POST
            app.post('/user', async (req, res) => {
                const {user} = req.body;
                if (user) {
                    models.User.create(user)
                        .then(createdModel => {
                            return res.send(createdModel);
                        })
                        .catch(error => {
                            return res.send(`ADDING USER FAILED`).code(304);
                        })

                } else {
                    return res.send(`ADDING USER FAILED`).code(304);
                }

            });

            //READ - GET
            app.get('/users', async (req, res) => {
                models.User.findAll({
                    where: {
                        isDeleted: false
                    }
                }).then((users) => {
                    return res.send(users);
                }).catch(error => {
                    return res.send(`FETCHING USERS FAILED`).code(304);
                });
            });

            app.get('/user/:id', async (req, res) => {
                const {id} = req.params;
                models.User.findAll({
                    where: {
                        id
                    }
                }).then((users) => {
                    return res.send(users);
                }).catch(error => {
                    return res.send(`FETCHING USER FAILED`).code(304);
                });
            });


            //UPDATE - PUT
            app.put('/user/:id', (req, res) => {
                const {id} = req.params;
                const {user} = req.body;

                console.log('id on update', id)
                console.log('req body on update', req.body)
                if (user) {
                    models.User.findAll({
                        where: {
                            id
                        }
                    })
                        .then(foundUser => {
                            console.log('found user', foundUser)
                            foundUser[0].update({...user}).then(updatedUser => {
                                return res.send(updatedUser);

                            }).catch(error => {
                                return res.send(`UPDATING USER FAILED`).code(304);
                            })
                        })
                        .catch(error => {
                            return res.send(`UPDATING USER FAILED`).code(304);
                        })

                } else {
                    return res.send(`UPDATING USER FAILED - DATA NOT PROVIDED`).code(304);
                }

            });

            //DELETE - DELETE
            app.delete('/user/:id', async (req, res) => {
                console.log('app delete called!', req.params.id);
                const {id} = req.params;

                await models.User.findAll({
                    where: {
                        id
                    }
                }).then((user) => {
                    console.log('deleting user!', user[0].getDataValue('surname'), user[0].getDataValue('isDeleted'));
                    user[0].update({
                        isDeleted: true
                    })
                        .then(() => {
                            return res.send(
                                `DELETE SUCCEEDED`,
                            );
                        })
                        .catch(error => {
                            return res.send(
                                `DELETE FAILED`,
                            ).code(304);
                        })
                }).catch(error => {
                    return res.send(
                        `DELETE FAILED`,
                    ).code(304);
                })
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