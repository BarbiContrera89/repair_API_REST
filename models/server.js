const express = require('express');
const { repairRouter } = require('../routes/repair.router');
const cors = require('cors');
const { usersRouter } = require('../routes/users.router');
const { db } = require('../dataBase/db');
const initModel = require('./init.model');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controllers');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.paths = {
      repair: '/api/v1/repairs',
      user: '/api/v1/users',
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  // Rutas
  routes() {
    this.app.use(this.paths.repair, repairRouter);
    this.app.use(this.paths.user, usersRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  //Metodos para escuchar solicitudes por el puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

//2. Exportamos el servidor
module.exports = Server;
