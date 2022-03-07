const express = require('express');
const cors = require('cors');
//Routers
const { routerTodo } = require('./routes/todos.routes');
//Utils
const { sequelize } = require('./utils/database');

const app = express();
app.use(cors());
app.use(express.json());

//Endpoints
app.use('/api/v1/todos', routerTodo);

sequelize
  .authenticate()
  .then(() => console.log('Database autenticate'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log('App running');
});
