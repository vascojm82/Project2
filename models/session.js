module.exports = function (sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sess: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    return Session;
};
