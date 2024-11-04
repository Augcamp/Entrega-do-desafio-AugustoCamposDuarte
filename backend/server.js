const express = require('express');
const cors = require('cors');
const usersController = require('./controller/userController');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/', usersController);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
