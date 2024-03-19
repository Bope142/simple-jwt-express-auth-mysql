const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: {
      type: DataTypes.ENUM("user", "admin", "superAdmin", "manager"),
      defaultValue: "user",
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  };

  const options = {
    defaultScope: {
      // Exclude created_at hash by default
      attributes: { exclude: ["created_at"] },
    },
    scopes: {
      // Include hash with this scope
      withHash: { attributes: {} },
    },

    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,

    defaultValues: {
      role: "user",
    },
  };

  return sequelize.define("users", attributes, options);
}
