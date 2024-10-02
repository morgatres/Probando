import {Sequelize} from 'sequelize';

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from '../config';

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'sqlite'
  });


export default sequelize;