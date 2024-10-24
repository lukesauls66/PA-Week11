"use strict";
const { Model } = require("sequelize");
const {
  maxNumPassengers,
  inService,
} = require("../../test/data/airplane-values");
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Airplane.init(
    {
      airlineCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          lengthOf2(value) {
            if (value.length !== 2) {
              throw new Error("Length must be 2!");
            }
          },
          mustBeCap(value) {
            if (value !== value.toUpperCase()) {
              throw new Error("Must be capitalized");
            }
          },
        },
      },
      flightNumber: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isNumeric: true,
        },
      },
      inService: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      maxNumPassengers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          validNum(value) {
            if (value <= 0 || value >= 854) {
              throw new Error("Max must be between 1 and 853 passengers.");
            }
          },
        },
      },
      currentNumPassengers: {
        type: DataTypes.INTEGER,
        validate: {
          lessThanMax(value) {
            if (value > maxNumPassengers.value) {
              throw new Error("Must be less than max passengers.");
            }
          },
          notInService(value) {
            if (inService === false) {
              value = null;
            }
          },
          validNum(value) {
            if (value < 0 || value >= 854) {
              throw new Error("Current must be between 1 and 853 passengers.");
            }
          },
        },
      },
      firstFlightDate: {
        type: DataTypes.DATE,
        validate: {
          correctYear(value) {
            const year = value.slice(0, 4);
            if (year > 2021 || year < 2020) {
              throw new Error("Year must be either 2020 or 2021");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Airplane",
    }
  );
  return Airplane;
};
