const express = require('express');
import User from './models/User';
import {database} from './database/database';

module.exports = class App {
    constructor() {

    }

    async start() {
        const app = express();
        const PORT = 8000;


        try {
            await database.testConnection();


            const models = {
                User: User.init(database.getSequelizeInstance())
            }

            models.User.create({
                id: 34,
                name: "Jarzyna",
                surname: "ze Szczecina",
                login: "super123",
                dateOfBirth: "1999-01-19",
                passwordMd5: "siemano kolano",
                isDeleted: false
            })


        } catch (error) {
            console.log("[ERRROR] Couldn't connect to database!");
            console.log("{ERROR_MSG}: \n" + error);
        }

// //CREATE - POST
// app.post('/users', (req, res) => {
//     return res.send('POST HTTP method on user resource');
// });
//
// //READ - GET
// app.get('/users', (req, res) => {
//     return res.send('GET HTTP method on user resource');
// });
//
// //UPDATE - PUT
// app.put('/users/:userId', (req, res) => {
//     return res.send(
//         `PUT HTTP method on user/${req.params.userId} resource`,
//     );
// });
//
// //DELETE - DELETE
// app.delete('/users/:userId', (req, res) => {
//     return res.send(
//         `DELETE HTTP method on user/${req.params.userId} resource`,
//     );
// });

        app.listen(PORT, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
        });
    }
}