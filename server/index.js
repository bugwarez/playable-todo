const connection = require('./db');
const cors = require('cors');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const users = require('./routes/users');
require('dotenv').config();
connection();

app.use(express.json());
app.use(cors());

app.use('/api/tasks/', tasks);
app.use('/api/users/', users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on ${port}`));
