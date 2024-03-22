'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    get formatDate() {
      let date = new Date(this.createdAt)
      let today = new Date();

      let min = Math.floor((today - date) / 60000);
      let h = Math.floor(min / 60);
      let m = min % 60;
      if (h > 0) {
        return `Added ${h} hours ago`;
      } else {
        return `Added ${m} minutes ago`;
      }
    }

  }
  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};