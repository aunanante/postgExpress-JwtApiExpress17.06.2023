const { DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");

const Detail = sequelise.define('details', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    detailName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageDetailUrl: {
        type: DataTypes.STRING,
    },
})

exports.Detail = Detail