export default (sequelize, DataTypes) => {
    const Author = sequelize.define(
      "author",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
          unique: {
            args: true,
            message: "Author's name must be unique!",
          },
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return Author;
  };