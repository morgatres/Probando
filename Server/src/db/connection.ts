import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('almacen', 'root', 'lanuu', {
    host: 'localhost',
    dialect: 'mysql'
  });

export default sequelize;