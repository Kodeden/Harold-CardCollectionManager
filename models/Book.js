export default (sequelize, DataTypes) => {
    const Book = sequelize.define(
      "book",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
          unique: {
            args: true,
            message: "Book Title must be unique!",
          },
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return Book;
  };