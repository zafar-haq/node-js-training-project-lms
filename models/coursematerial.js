'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CourseMaterial.belongsTo(models.Class, {foreignKey: 'classId'})
    }
  };
  CourseMaterial.init({
    file:{ 
      type:DataTypes.STRING,
      get() {
        let rawValue = this.getDataValue('file');
        return rawValue ? ( 'localhost:8000/' + rawValue) : null;
      }
    },
    name: DataTypes.STRING,
    classId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CourseMaterial',
  });
  return CourseMaterial;
};