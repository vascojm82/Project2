module.exports = function (sequelize, DataTypes) {
    var Favorites = sequelize.define("Favorites", {
        movieId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }      
    });

    Favorites.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Favorites.belongsTo(models.Profile, {
          foreignKey: {
            allowNull: false
          }
        });
      };
      
    return Favorites;
};
