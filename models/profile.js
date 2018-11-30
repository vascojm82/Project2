module.exports = function (sequelize, DataTypes) {
    var Profile = sequelize.define("Profile", {
        profileId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        profilePic: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Profile.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Profile.hasMany(models.Favorites, {
            onDelete: "cascade"
        });
    };

    return Profile;
};
