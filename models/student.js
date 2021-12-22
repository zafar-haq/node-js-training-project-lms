'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Class, {through:'StudentClass', foreignKey:'studentId'})
    }
  };
  Student.init({
    name: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail: true
      }
    },
    password:{ 
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len: [5,100]
      }
    }
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};