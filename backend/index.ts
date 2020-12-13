const express  = require('express');
const { Sequelize } = require('sequelize');

// rest of the code remains same
const app = express();
const PORT = 8000;

const sequelize = new Sequelize(
    'db',
    'kamil',
    'zaq1@WSX',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    }
);

const test = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test();

//
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