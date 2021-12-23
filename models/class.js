'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.hasMany(models.Instructor, {foreignKey:'classId'})
      Class.belongsToMany(models.Student, {through:'StudentClass', foreignKey:'classId'})
      Class.hasMany(models.CourseMaterial, {foreignKey:'classId'})
    }
  };
  Class.init({
    course_name: DataTypes.STRING,
    strength: DataTypes.INTEGER,
    enrolledStudents: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};