export default (sequelize, DataTypes) => {
    const Image = sequelize.define(
      "Image",
      {
        file: {
          type: DataTypes.STRING, 
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return Image;
  };