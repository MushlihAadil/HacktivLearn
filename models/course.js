'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      });
      Course.belongsToMany(models.User, {
        through: models.UserCourse,
        foreignKey: `CourseId`,
        otherKey: `UserId`
      })
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        limitDuration(value) {
          if (this.duration > 240) {
            throw new Error("Course duration is too long");
          } else if (this.duration <= 0) {
            throw new Error("Course duration must be greater than 0");
          }
        },
        notEmpty: {
          msg: `Course duration cannot be empty`
        },
        notNull: {
          msg: `Course duration cannot be empty`
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: `Categories`,
        key: `id`
      },
      onUpdate: `cascade`,
      onDelete: `cascade`
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};